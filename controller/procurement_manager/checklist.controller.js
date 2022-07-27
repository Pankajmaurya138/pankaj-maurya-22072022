const db = require('../../config/connection');
const httpStatus = require('http-status-codes');
const response = require('../../utils/response');
const checkListService = require('../../services/checkList');
const common = require('../../constant/common');
const helper = require('../../utils/helper');
const { Op, Sequelize } = require('sequelize');
const { isNumber } = require('lodash');


exports.GetCheckList = async(req,res)=>{
    try {
        let checkListData;
        if(req.query.check_list_id !=undefined){
            const condition = {
                id:req.query.check_list_id
            }
            checkListData = await checkListService.GetCheckList(condition);
        }else{
            
            checkListData = await checkListService.GetCheckList();
        }
        if(checkListData){
            return response.success(
                { msgCode: 'API_SUCCESS', data: checkListData },
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