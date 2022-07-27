/* eslint-disable no-undef */
/* eslint-disable no-console */
const modelList = require('../models/index');
const sequelize = require('sequelize');



// add user here //
exports.CreateOrder = async (data, transaction) => {
    try {
        const { Order } = await modelList();

        const orderInfo = await Order.create(data, { transaction });

        return orderInfo ? JSON.parse(JSON.stringify(orderInfo)) : false;
    }
    catch (error) {
        console.error('CreateOrder>>>>>>>>>', error);
        return false;
    }
};

exports.CreateCheckList = async (data, transaction) => {
    console.error('CreateCheckList>>>>>>>>>', data);
    try {
        const { CheckList } = await modelList();

        const checkList = await CheckList.create(data, { transaction });

        return checkList ? JSON.parse(JSON.stringify(checkList)) : false;
    }
    catch (error) {
        console.error('CreateCheckList>>>>>>>>>', error);
        return false;
    }
};


exports.updateOrderStatus = async (data, condition, transaction) => {
    try {
        const { Order } = await modelList();
        let order = await Order.update(
            data,
            { where: condition },
            { transaction }
        );
        console.error('updateOrderStatus>>>>>>>>>', order);
        if(order){
             order = await Order.findOne(
              
                { where: condition },
               
            );
        }
        return order ? JSON.parse(JSON.stringify(order)) : false;
    }
    catch (error) {
        console.error('updateOrderStatus>>>>>>>>>', error);
        return false;
    }
};

exports.GetOrderDetail = async (condition) => {
    try {
        const { Order,Auth } = await modelList();

        const getOrderDetail = await Order.findOne({
            where: condition,
            include:{model:Auth, as:"procurement_manager", attributes:['id','first_name','last_name','email','user_type']},
        });
        return getOrderDetail ? JSON.parse(JSON.stringify(getOrderDetail)) : false;
    }
    catch (error) {
        console.error('GetOrderDetail>>>>>>>>>', error);
        return false;
    }
};

exports.GetAllOrderDetail = async() => {
    try {
        const { Order,Auth } = await modelList();

        const getAllOrder = await Order.findAll({include:{model:Auth, as:"procurement_manager", attributes:['id','first_name','last_name','email','user_type']},});
        return getAllOrder ? JSON.parse(JSON.stringify(getAllOrder)) : false;
    }
    catch (error) {
        console.error('GetOrderDetail>>>>>>>>>', error);
        return false;
    }
};

exports.uploadCheckList = async(data,transaction)=>{
    try {
        const { CheckList } = await modelList();
        let checkList = await CheckList.create(
            data,
            { transaction }
        );
        console.error('uploadCheckList>>>>>>>>>', checkList);
        
        return checkList ? JSON.parse(JSON.stringify(checkList)) : false;
    }
    catch (error) {
        console.error('uploadCheckList>>>>>>>>>', error);
        return false;
    }
};







