const authValidation = require('./schema');
const response = require('../../utils/response');
const httpStatus = require('http-status-codes');
const authService = require('../../services/auth');
exports.signup = (req, res, next) => {
    const { error } = authValidation.signup.validate(req.body);
    const valid = error == null;
    if (valid) {
        return next();
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return response.error(
            { msgCode: 'VALIDATION_ERROR', data: message },
            res,
            httpStatus.StatusCodes.BAD_REQUEST
        );
    }
};

exports.procurementManagerSignUp = (req, res, next) => {
    const { error } = authValidation.isProcurementSignup.validate(req.body);
    const valid = error == null;
    if (valid) {
        return next();
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return response.error(
            { msgCode: 'VALIDATION_ERROR', data: message },
            res,
            httpStatus.StatusCodes.BAD_REQUEST
        );
    }
};

exports.InspectionManagerLogin = (req, res, next) => {
    // console.log(req);
    const { error } = authValidation.inspectionManagerLogin.validate(req.body);
    const valid = error == null;
    if (valid) {
        return next();
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return response.error(
            { msgCode: 'VALIDATION_ERROR', data: message },
            res,
            httpStatus.StatusCodes.BAD_REQUEST
        );
    }
};


exports.assignInspectionManager = (req, res, next) => {
    // console.log(req);
    const { error } = authValidation.assignInspectionManager.validate(req.body);
    const valid = error == null;
    if (valid) {
        return next();
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return response.error(
            { msgCode: 'VALIDATION_ERROR', data: message },
            res,
            httpStatus.StatusCodes.BAD_REQUEST
        );
    }
};


exports.Login =async (req, res, next) => {
    const {user_type } = req.body;
    let checkUserExist;
    let condition;
    if(user_type!=="INSPECTION_MANAGER"){
        
        var { error } = authValidation.login.validate(req.body);
        // Checking if user already exists in our database.
    }
    else{
       
        var { error } = authValidation.inspectionManagerLogin.validate(req.body);
    }

    var valid = error == null;
    if (valid) {
        return next();
    }
    else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        return response.error(
            { msgCode: 'VALIDATION_ERROR', data: message },
            res,
            httpStatus.StatusCodes.BAD_REQUEST
        );
    }
    
    
};

