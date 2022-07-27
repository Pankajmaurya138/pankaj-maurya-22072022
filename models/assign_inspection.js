
module.exports = (sequelize, DataTypes) => {
    const AssignInspection = sequelize.define(
        'assign_inspection',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement:true,
            },
            procure_manager_user_id: {
                type:DataTypes.BIGINT,
                allowNull: false,
            },
            inspection_manager_user_id: {
                type:DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            tableName: 'assign_inspection',
            timestamps: true,
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    );
    
    return AssignInspection;
};
