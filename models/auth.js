
module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define(
        'auths',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement:true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            mobile_number:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: true
            },
            created_by:{
                type:DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 1
            },
            user_type: {
                type: DataTypes.ENUM(
                    'SUPERADMIN',
                    'PROCUREMENT_MANAGER',
                    'INSPECTION_MANAGER',
                    'CLIENT',
                ),
                allowNull: false,
                defaultValue: 'CLIENT'
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 1
            },
            is_assigned: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 0,
                get() {
        
                    const value = this.getDataValue('is_assigned');
                    const status = value==1?'Assigned':'Not-Assigned' 
                    return status
                  }
            },
           
        },

        {
            tableName: 'auths',
            timestamps: true,
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
        
    );
    return Auth;
};
