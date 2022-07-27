
module.exports = (sequelize, DataTypes) => {
    const Checklist = sequelize.define(
        'checklist',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement:true,
            },  
            procurement_manager_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },       
            file_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            checklist_fields:{
                type: DataTypes.JSON,
                allowNull: false,
               
                
            },
            checklist_with_answer:{
                type: DataTypes.JSON,
                allowNull: true,
               
               
            },
        },
        
        {
            tableName: 'checklist',
            timestamps: true,
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    );
    return Checklist;
};
