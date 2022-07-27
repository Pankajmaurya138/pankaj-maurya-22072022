const db = require('../../config/connection');
const passwordHash = require('../../utils/password');
const authJwt = require('../../middlewares/auth');
const httpStatus = require('http-status-codes');
const response = require('../../utils/response');
const authService = require('../../services/auth');
const common = require('../../constant/common');
const helper = require('../../utils/helper');
const { Op, Sequelize } = require('sequelize');


exports.IsUserExist = async (req, res, next) => {
    try {
        const { email ,user_type } = req.body;
        const condition = {
            email: email.toLowerCase(),
        };
       

        // Checking if user already exists in our database.
        const checkUserExist = await authService.GetAuthDetail(condition);
        if (!checkUserExist) {
            return next();
        }
        if(user_type==='INSPECTION_MANAGER'){
            return response.error(
                { msgCode: 'ALREADY_INSPECPTION_MANAGER_REGISTERED' },
                res,
                httpStatus.StatusCodes.CONFLICT
            );
        }
        return response.error(
            { msgCode: 'ALREADY_REGISTERED' },
            res,
            httpStatus.StatusCodes.CONFLICT
        );
        
    }
    catch (err) {
        
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

exports.IsUserMobileExist = async (req, res, next) => {
    try {
        const { mobile_number } = req.body;
        const condition = {
            mobile_number: mobile_number
        };
       
        // Checking if user already exists in our database.
        const checkUserExist = await authService.GetAuthDetail(condition);
        if (!checkUserExist) {
            return next();
        }
        return response.error(
            { msgCode: 'ALREADY_MOBILE_REGISTERED' },
            res,
            httpStatus.StatusCodes.CONFLICT
        );
    }
    catch (err) {
        
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

exports.signup = async (req, res, next) => {

    const dbTrans = await db.transaction(); // Creating database transaction
    try {
        const {
           first_name,
           last_name,
           email,
           mobile_number,
           user_type,
           password
        } = req.body;

        const authData = {
            id: helper.GenUUID(),
            email,
            first_name,
            last_name,
            mobile_number,
            // Generating password hash using bcrypt
            password: await passwordHash.generateHash(password),
            user_type,
            created_by:req.data.id
        };

        // Adding student authentication details in auth table
        const createAuthDetail = await authService.AddAuthDetail(authData, dbTrans);

        if (!createAuthDetail) {
            await dbTrans.rollback();
            return response.error(
                { msgCode: 'SIGNUP_FAILED' },
                res,
                httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
            );
        }

        let access_token = await authJwt.GenerateAuthJwt({
            id: createAuthDetail.id,
            user_type: createAuthDetail.user_type,
            expires_in: '10 days'
        });

        const updateTokenData = {
            access_token:access_token,
        }

        const updateTokenCondition = {
            id:createAuthDetail.id,
        }
        await dbTrans.commit();
        // update token to auth table 
        const updateAccessToken = await authService.updateAccessToken(updateTokenData,updateTokenCondition,dbTrans);

        if(!updateAccessToken){
           
            await dbTrans.rollback();
            return response.error(
                { msgCode: 'SIGNUP_FAILED' },
                res,
                httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
            );
            
        }        
        return response.success(
            { msgCode: 'USER_REGISTERED_LOGIN', data: updateAccessToken },
            res,
            httpStatus.StatusCodes.CREATED
        );
        
    }
    catch (err) {
        await dbTrans.rollback();
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};

exports.Login = async (req, res, next) => {
    const dbTrans = await db.transaction();
    try {
        const { email} = req.body;

        const condition = {
            email
        };

        // check user exists with email id or not //
        const checkUser = await authService.GetAuthDetail(condition);
        if (!checkUser) {
            await dbTrans.rollback();
            return response.error(
                { msgCode: 'INVALID_CREDENTIALS' },
                res,
                httpStatus.StatusCodes.BAD_REQUEST
            );
        }
        
        //compare the password of user //
        const isLogin = await passwordHash.comparePassword(
            req.body.password,
            checkUser.password
        );
        if (!isLogin) {
            await dbTrans.rollback();
            return response.error(
                { msgCode: 'INVALID_CREDENTIALS' },
                res,
                httpStatus.StatusCodes.BAD_REQUEST
            );
        }
        
        // Generating Jwt token after successful signup
       let access_token = await authJwt.GenerateAuthJwt({
            id: checkUser.id,
            user_type: checkUser.user_type,
            expires_in: '10 days',
        });

        const updateTokenData = {
            access_token:access_token,
        }

        const updateTokenCondition = {
            id:checkUser.id,
        }
        const updateAccessToken = await authService.updateAccessToken(updateTokenData,updateTokenCondition,dbTrans);
        if (!updateAccessToken) {
            await dbTrans.rollback();
            return response.error(
                { msgCode: 'INTERNAL_SERVER_ERROR' },
                res,
                httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
        delete updateAccessToken.password
        return response.success(
            { msgCode: 'LOGIN_SUCCESSFUL', data: updateAccessToken },
            res,
            httpStatus.StatusCodes.CREATED
        );

    }
    catch (err) {
        await dbTrans.rollback();
        console.log(err);
        return response.error(
            { msgCode: 'INTERNAL_SERVER_ERROR' },
            res,
            httpStatus.StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
};


exports.GetAllAssignedInspectionManager = async(req,res)=>{
    try {

        let condition = {
            procure_manager_user_id:req.data.id
        };

        const getAllInspectionManager = await authService.GetAllAssignedInspectionManager(condition);
        if(getAllInspectionManager){
            return response.success(
                { msgCode: 'API_SUCCESS', data: getAllInspectionManager },
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

