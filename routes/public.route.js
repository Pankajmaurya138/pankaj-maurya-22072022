const router = require('express').Router();
const authDataValidation = require('../validations/auth');
const orderValidation = require('../validations/order')
const authController = require('../controller/admin/auth.controller');
const OrderController = require('../controller/public/order.controller')
const jwtVerify = require('../middlewares/auth');



router.post(
    '/login',
    authDataValidation.Login,
    authController.Login,
);

router.get(
    '/order_details',
    orderValidation.OrderDetail,
    OrderController.OrderDetail,
);



router.post(
    '/update_order_status',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsOrderStatusUpdate,
    orderValidation.UpdateOrderStatus,
    OrderController.updateOrderStatus,
);




module.exports = router;
