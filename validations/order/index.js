const orderValidation = require('./schema');
const response = require('../../utils/response');
const httpStatus = require('http-status-codes');

exports.OrderDetail = (req, res, next) => {
    const { error } = orderValidation.OrderDetail.validate(req.body);
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


exports.UpdateOrderStatus = (req, res, next) => {
    const { error } = orderValidation.UpdateOrderStatus.validate(req.body);
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

exports.addCheckListAnswer = (req, res, next) => {
    const { error } = orderValidation.addCheckListAnswer.validate(req.body);
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


