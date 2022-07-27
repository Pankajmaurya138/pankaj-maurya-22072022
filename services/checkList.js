/* eslint-disable no-undef */
/* eslint-disable no-console */
const modelList = require('../models/index');
const sequelize = require('sequelize');

exports.GetCheckList = async (condition) => {
    try {
        const { CheckList } = await modelList();
        let checklistData;
        if(condition!==null || condition !==undefined){
           checklistData = await CheckList.findAll({
                where:condition
           });
        }else{
            
           checklistData = await CheckList.findAll({});
        }
     
        return checklistData ? JSON.parse(JSON.stringify(checklistData)) : false;
    }
    catch (error) {
        console.error('checklistData>>>>>>>>>', error);
        return false;
    }
};

// update access token to user //
exports.addCheckListAnswer = async (data, condition, transaction) => {
    try {
        const { Order } = await modelList();
        let order = await Order.update(
            data,
            { where: condition },
            { transaction }
        );
        console.error('order>>>>>>>>>', order);
        if(order){
             order = await Order.findOne(
              
                { where: condition },
               
            );
        }
        return order ? JSON.parse(JSON.stringify(order)) : false;
    }
    catch (error) {
        console.error('order>>>>>>>>>', error);
        return false;
    }
};














