const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'orders',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement:true,
            },  
            checklist_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            }, 
            procurement_manager_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },      
            order_status: {
                type: DataTypes.ENUM(
                    'PENDING',
                    'COMPLETED',
                    'REJECTED'
                ),
                allowNull: false,
                defaultValue: 'PENDING'
            },
            checklist_with_answer:{
                type: DataTypes.JSON,
                allowNull: true,
            },
            reason: {
                type: DataTypes.TEXT,
                allowNull: true,  
            }, 
        },
        {
            tableName: 'orders',
            timestamps: true,
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    );

   

    return Order;
};
