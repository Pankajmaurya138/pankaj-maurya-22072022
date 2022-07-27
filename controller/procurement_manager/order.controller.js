const db = require('../../config/connection');
const httpStatus = require('http-status-codes');
const response = require('../../utils/response');
const authService = require('../../services/auth');
const orderService = require('../../services/order');
const multer = require('multer')
const path = require('path')

exports.createOrder = async(req,res)=>{
    const dbTrans = await db.transaction(); // Creating database transaction
    try {
        let {file_path,checklist_fields,checklist_with_answer,checklist_id} = req.body;

        let  createOrderData = {
            procurement_manager_id:req.data.id,
            checklist_fields:checklist_fields,
            checklist_with_answer:checklist_with_answer,
            file_path:file_path
        };
        
        console.log("111111111111111111111111111111",checklist_id)
        if(checklist_id=="" || checklist_id==undefined){
            let createOrder = await orderService.CreateCheckList(createOrderData,dbTrans);
            if(!createOrder){
                return response.error(
                    { msgCode: 'CREATE_ERROR' },
                    res,
                    httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
                );
            }  
            
            createOrderData.checklist_id=createOrder.id 
        }else{
            createOrderData.checklist_id=checklist_id
        }
        let createOrder = await orderService.CreateOrder(createOrderData,dbTrans);
        if(createOrder){
            await dbTrans.commit();
            return response.success(
                { msgCode: 'API_SUCCESS', data: createOrder },
                res,
                httpStatus.StatusCodes.CREATED
            );
        }else{
            return response.error(
                { msgCode: 'CREATE_ERROR' },
                res,
                httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
        
    }
    catch (err) {
        
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

}

exports.uploadFile = async(req,res)=> {
    
    const dbTrans = await db.transaction();// Creating database transaction
    try {            
        var storage = multer.diskStorage({ 
            destination: function (req, file, cb) { 
                // Uploads is the Upload_folder_name 
                
                cb(null, path.join(__dirname, '../../public/uploads/')) 
            }, 
            filename: function (req, file, cb) { 
                cb(null, Date.now()+'_'+file.originalname) 
            } 
            });

        //file size
        const maxSize = 1 * 1000 * 1000;
        
        var upload = multer({storage:storage,limits: { fileSize: maxSize }, 
                fileFilter: function (req, file, cb){ 
                
                    // Set the filetypes, it is optional 
                    var filetypes = /jpeg|jpg|png|pdf|doc|docx/; 
                    var mimetype = filetypes.test(file.mimetype); 
            
                    var extname = filetypes.test(path.extname( 
                                file.originalname).toLowerCase()); 
                    
                    if (mimetype && extname) { 
                        return cb(null, true); 
                    } 
                
                    cb("FileTypeError: File upload only supports the "
                            + "following filetypes - " + filetypes); 
                }
                
            }).single('upload_file');

            upload(req,res,async function(err) {
            if(err) {
                console.log("877538752381",err)
                if(err.includes("FileTypeError")) {
                    return response.error(
                        { msgCode: 'FILE_TYPE_ERROR' },
                        res,
                        httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
                    );
                }
                return response.error(
                    { msgCode: 'FILE_UPLOAD_ERROR' },
                    res,
                    httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
            if(req.file===undefined){
                return response.error(
                    { msgCode: 'FILE_REQUIRED' },
                    res,
                    httpStatus.StatusCodes.BAD_REQUEST
                );
            }
            
            const path = req.file.path;
            // const createCheckList = await orderService.uploadCheckList(createData,dbTrans);
            if(path){
                await dbTrans.commit();
                return response.success(
                    { msgCode: 'API_SUCCESS', data: path },
                    res,
                    httpStatus.StatusCodes.CREATED
                );
            }
    
        });
    } catch (error) {
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
