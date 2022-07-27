const db = require('../../config/connection');
const httpStatus = require('http-status-codes');
const response = require('../../utils/response');
const authService = require('../../services/auth');
const checkListService = require('../../services/checkList');
const multer = require('multer')
const path = require('path')


exports.addCheckListAnswer = async(req,res)=>{
    let {order_id,checklist_with_answer} = req.body;
    const dbTrans = db.transaction();
    // try {
        if(checklist_with_answer.length>0){
            checklist_with_answer.forEach(element => {
                if(element.required==true){
                    let customMsg;
                    if(element.answer==="" || element.answer===null || element.answer===undefined ){
                        customMsg = `Answer of this question is required:${element.question_name}`
                        return response.validationError(
                            { msgCode: 'VALIDATION_ERROR' },
                            customMsg,
                            res,
                            httpStatus.StatusCodes.BAD_REQUEST
                        );
                    }
                    if(!element.value.includes(element.answer)){
                        customMsg = `Wrong answer the answer contains only one values:${element.value} `
                        return response.validationError(
                            { msgCode: 'VALIDATION_ERROR' },
                            customMsg,
                            res,
                            httpStatus.StatusCodes.BAD_REQUEST
                        );
                    }
                }
            });

            const updateDataCondition = {
                id:order_id,
            };

            const updateData = {
                checklist_with_answer:checklist_with_answer,
                order_status:'COMPLETED'
            };

            let updateAnswer  = await checkListService.addCheckListAnswer(updateData,updateDataCondition,dbTrans)
            if(updateAnswer){
                return response.success(
                    { msgCode: 'API_SUCCESS', data: updateAnswer },
                    res,
                    httpStatus.StatusCodes.CREATED
                );
            }else{
                return response.error(
                    { msgCode: 'INTERNAL_SERVER_ERROR' },
                    res,
                    httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
    // } catch (error) {
    //     return response.error(
    //         { msgCode: 'INTERNAL_SERVER_ERROR' },
    //         res,
    //         httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
    //     );
    // }
}
