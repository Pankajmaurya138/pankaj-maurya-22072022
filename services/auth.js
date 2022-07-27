/* eslint-disable no-undef */
/* eslint-disable no-console */
const modelList = require('../models/index');
const sequelize = require('sequelize');

exports.GetAuthDetail = async (condition) => {
    try {
        const { Auth } = await modelList();

        const getAuthDetail = await Auth.findOne({
            where: condition,
        });
        return getAuthDetail ? JSON.parse(JSON.stringify(getAuthDetail)) : false;
    }
    catch (error) {
        console.error('GetAuthDetail>>>>>>>>>', error);
        return false;
    }
};

exports.GetAllInspectionManager = async (condition) => {
    try {
        const { Auth } = await modelList();

        const getAuthDetail = await Auth.findAll({
            where:condition,
            attributes: ['id','first_name','last_name','email','user_type','is_assigned','created_at' ],
            // limit: 10
        });
        return getAuthDetail ? JSON.parse(JSON.stringify(getAuthDetail)) : false;
    }
    catch (error) {
        console.error('GetAuthDetail>>>>>>>>>', error);
        return false;
    }
};

exports.GetAllProcureManager = async (condition) => {
    try {
        const { Auth } = await modelList();

        const getAuthDetail = await Auth.findAll({
            where:condition,
            attributes: ['id','first_name','last_name','email','user_type','created_at' ],
            // limit: 10
        });
        return getAuthDetail ? JSON.parse(JSON.stringify(getAuthDetail)) : false;
    }
    catch (error) {
        console.error('GetAuthDetail>>>>>>>>>', error);
        return false;
    }
};

exports.assignedInspectionManager = async (data, transaction) => {
    try {
        const { Auth,AssignInspection } = await modelList();

        const addAssignInfo = await AssignInspection.create(data, { transaction });
        if(addAssignInfo){
                await Auth.update({is_assigned:1},{where:{id:data.inspection_manager_user_id}})
        }
        return addAssignInfo ? JSON.parse(JSON.stringify(addAssignInfo)) : false;
    }
    catch (error) {
        console.error('AddAuthDetail>>>>>>>>>', error);
        return false;
    }
};

exports.GetAllAssignedInspectionManager = async (condition) => {
    try {
        const { AssignInspection,Auth } = await modelList();

        const inspectionManager = await AssignInspection.findAll({
            where:condition,
            include:[{model:Auth, as:"procurement_manager", attributes:['id','first_name','last_name','email','user_type']},
           {model:Auth, as:"inspection_manager", attributes:['id','first_name','last_name','email','user_type']},
        ],
            // limit: 10
        });
        return inspectionManager ? JSON.parse(JSON.stringify(inspectionManager)) : false;
    }
    catch (error) {
        console.error('inspectionManager>>>>>>>>>', error);
        return false;
    }
};

exports.CheckInspectionManagerAssigned = async (condition) => {
    try {
        const { AssignInspection } = await modelList();

        const checkInspectionManager = await AssignInspection.findOne({
            where: condition,
        });
        return checkInspectionManager ? JSON.parse(JSON.stringify(checkInspectionManager)) : false;
    }
    catch (error) {
        console.error('checkInspectionManager>>>>>>>>>', error);
        return false;
    }
};

exports.CheckSubAdmin = async (condition) => {
    try {
        const { SubAdmin } = await modelList();

        const getAuthDetail = await SubAdmin.findOne({
            where: condition
        });
        return getAuthDetail ? JSON.parse(JSON.stringify(getAuthDetail)) : false;
    }
    catch (error) {
        console.error('GetAuthDetail>>>>>>>>>', error);
        return false;
    }
};

// update access token to user //
exports.updateAccessToken = async (data, condition, transaction) => {
    try {
        const { Auth } = await modelList();
        let auth = await Auth.update(
            data,
            { where: condition },
            { transaction }
        );
        console.error('auth>>>>>>>>>', auth);
        if(auth){
             auth = await Auth.findOne(
              
                { where: condition },
               
            );
        }
        return auth ? JSON.parse(JSON.stringify(auth)) : false;
    }
    catch (error) {
        console.error('auth>>>>>>>>>', error);
        return false;
    }
};

// add user here //
exports.AddAuthDetail = async (data, transaction) => {
    try {
        const { Auth } = await modelList();

        const addAuthInfo = await Auth.create(data, { transaction });

        return addAuthInfo ? JSON.parse(JSON.stringify(addAuthInfo)) : false;
    }
    catch (error) {
        console.error('AddAuthDetail>>>>>>>>>', error);
        return false;
    }
};


// exports.DeleteUser = async (condition, transaction) => {
//     try {
//         const { Auth } = await modelList();

//         const deleteUser = await Auth.destroy(
//             { where: condition },
//             { transaction }
//         );
//         return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : false;
//     }
//     catch (error) {
//         console.error('DeleteSession>>>>>>>>>', error);
//         return false;
//     }
// };




