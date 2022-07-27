const router = require('express').Router();
const authDataValidation = require('../validations/auth');
const orderValidation = require('../validations/order')
const authController = require('../controller/admin/auth.controller');
const OrderController = require('../controller/inspection_manager/order.controller');
const jwtVerify = require('../middlewares/auth');

router.post(
    '/add_answer_to_check_list',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsInspectionManager,
    orderValidation.addCheckListAnswer,
    OrderController.addCheckListAnswer,
);

module.exports = router;
