/* eslint-disable no-console */

const successMessage = {
    SIGNUP_SUCCESSFUL: 'User registered successfully',
    LOGIN_SUCCESSFUL: 'User logged in successfully',
    USER_REGISTERED_LOGIN:'User registered successfully.',
    API_SUCCESS: 'Success',
    NOT_FOUND: 'Data not found',
    LOGOUT_SUCCESSFUL: 'User logged out successfully',
    PASSWORD_UPDATED: 'Password has been Updated!',
    FORGOT_PASSWORF: 'Reset link Sent on your mail',
    BLOG_CREATED: 'Blog Created Successfully.',
    BLOG_DETAILS: 'Blog Details',
    NOT_MATCHED: 'Not Matched Yet',
    DELETED: 'Deleted successfully.',
};


const errorMessage = {
    TOKEN_EXPIRED: 'Token Expired resend again',
    ALREADY_REGISTERED:'An account has been already created with this email.',
    ALREADY_MOBILE_REGISTERED:'Mobile number has been already registered.',
    ALREADY_INSPECPTION_MANAGER_REGISTERED:'An Inspection manager has been already registered.',
    ALREADY_ASSIGNED_INSPECTION_MANAGER:"An Inspection manager has been already assigned, please contact to admin for same.",
    UPDATE_ERROR: 'Error in updating data.',
    CREATE_ERROR: 'Error in updating data.',
    API_ERROR: 'Error in Api Execution.',
    VALIDATION_ERROR: 'Validation error.',
    INVALID_CREDENTIALS: 'Invalid Credentials',
    EMAIL_FAILURE: 'Email not sent.',
    FILE_TYPE_ERROR:"File upload only supports the:jpeg|jpg|png|pdf|doc|docx",
    USER_NOT_FOUND: 'User Not Found',
    FILE_UPLOAD_ERROR:'File upload Failed.',
    FILE_REQUIRED:"File is required",
    CONTACT_TO_ADMIN: 'Please contact the admin to reset your password',
    UNAUTHORISED: 'Unauthorized Access.',
    FAILED_TO_EDIT: "You can't edit some fields because you have matched with someone.",
    FAILED_TO_UPDATE: "You can't Update.",
    FAILED_TO_DELETE: 'Failed to Delete Data.',
    
};

exports.success = (result, res, code) => {
    try {
        const response = {
            success: true,
            success_code: code,
            message: successMessage[result.msgCode],
            result: result.data ? result.data : '',
            time: Date.now()
        };
        res.status(code).json(response);
    }
    catch (error) {
        console.log(
            '🚀 ~ file: response.js ~ line 12 ~ exports.success= ~ error',
            error
        );

        return res.json({
            success: true,
            success_code: 500,
            message: 'Internal Server Error.',
            result: '',
            time: Date.now()
        });
    }
};

exports.error = (error, res, code) => {
    try {
        const response = {
            success: false,
            error_code: code,
            message: errorMessage[error.msgCode],
            result: {
                error: error.data ? error.data : 'error'
            },
            time: Date.now()
        };
        res.status(code).json(response);
    }
    catch (err) {
        console.log(
            '🚀 ~ file: response.js ~ line 23 ~ exports.success= ~ err',
            err
        );

        return res.status(500).json({
            success: false,
            error_code: 500,
            message: 'Internal Server error.',
            result: '',
            time: Date.now()
        });
    }
};

exports.validationError = (error, customMsg, res, code) => {
    try {
        const response = {
            success: false,
            error_code: code,
            message: customMsg,
            result: {
                error: error.data ? error.data : 'error'
            },
            time: Date.now()
        };
        res.status(code).json(response);
    }
    catch (err) {
        console.log(
            '🚀 ~ file: response.js ~ line 23 ~ exports.success= ~ err',
            err
        );

        return res.status(500).json({
            success: false,
            error_code: 500,
            message: 'Internal Server error.',
            result: '',
            time: Date.now()
        });
    }
};

