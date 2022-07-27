/* eslint-disable no-console */
/* eslint-disable require-atomic-updates */
const { Sequelize } = require('sequelize');
const db = require('../config/connection');

const Auth = require('../models/auth')(db, Sequelize);
const AssignInspection = require('../models/assign_inspection')(db, Sequelize);
const Order = require('../models/order')(db, Sequelize);
const CheckList = require('../models/checklist')(db, Sequelize);

Order.belongsTo(Auth, { foreignKey: 'procurement_manager_id',as:"procurement_manager" });
AssignInspection.belongsTo(Auth, { foreignKey: 'procure_manager_user_id',as:"procurement_manager" });
AssignInspection.belongsTo(Auth, { foreignKey: 'inspection_manager_user_id',as:"inspection_manager" });
const Models = {
    Auth,
    AssignInspection,
    Order,
    CheckList
};


const connection = {};

module.exports = async () => {
    if (connection.isConnected) {
        console.log('=> Using existing connection.');
        return Models;
    }
    try {
        console.log('start connect');
        await db.authenticate();
        console.log('Connection has been established successfully.');
        connection.isConnected = true;
        await db.sync({ force: false, logging: false }).then(() => {
            console.log(`Database & tables created!`);
        }).catch((err) => {
            console.log('Database Creation err>>>>>>>>>>>', err);
        });
        return Models;
    }
    catch (error) {
        console.log('Unable to connect to the database:', error);
    }
};