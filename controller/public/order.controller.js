const db = require('../../config/connection');
const httpStatus = require('http-status-codes');
const response = require('../../utils/response');
const orderService = require('../../services/order');


exports.OrderDetail = async(req,res)=>{
    try {

        let condition = {
            id:req.body.order_id
        };

        const orderDetail = await orderService.GetOrderDetail(condition);
        if(orderDetail){
            orderDetail.checklist_with_answer = JSON.parse(orderDetail.checklist_with_answer)
            return response.success(
                { msgCode: 'API_SUCCESS', data: orderDetail },
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
    } catch (error) {
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

exports.GetAllOrderDetail= async(req,res)=>{
    try {
        const GetAllOrderDetail = await orderService.GetAllOrderDetail();
        if(GetAllOrderDetail){
            return response.success(
                { msgCode: 'API_SUCCESS', data: GetAllOrderDetail },
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
    } catch (error) {
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

exports.updateOrderStatus = async(req,res)=>{
    
    const dbTrans = await db.transaction();// Creating database transaction
    try {

        let condition = {
            order_id:req.body.order_id,
        };
        let updateData = {
            order_status:req.body.order_status
        }
        const orderStatusUpdate = await orderService.updateOrderStatus(updateData,condition,dbTrans);
        if(orderStatusUpdate){
            return response.success(
                { msgCode: 'API_SUCCESS', data: orderStatusUpdate },
                res,
                httpStatus.StatusCodes.CREATED
            );
        }else{
            return response.error(
                { msgCode: 'UPDATE_ERROR' },
                res,
                httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    } catch (error) {
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}





