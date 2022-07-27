const router = require('express').Router();
const authDataValidation = require('../validations/auth');
const orderValidation = require('../validations/order')
const authController = require('../controller/admin/auth.controller');
const OrderController = require('../controller/public/order.controller')
const jwtVerify = require('../middlewares/auth');


router.post(
    '/users/signup',
    authDataValidation.signup,
    authController.IsUserExist,
    authController.IsUserMobileExist,
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsSuperAdmin,
    authController.signup,
);

router.get(
    '/getAllInspectionManager',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsSuperAdmin,
    authController.getAllInspectionManager,
   
);

router.get(
    '/getAllProcureManager',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsSuperAdmin,
    authController.getAllProcureManager,
   
);

router.post(
    '/assignManager',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsSuperAdmin,
    authController.checkInspectionManagerAssigned,
    authController.assginedInspectionManager,
   
);

router.post(
    '/login',
    authDataValidation.Login,
    authController.Login,
);

router.get(
    '/getAllOrder',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsSuperAdmin,
    OrderController.GetAllOrderDetail,
);

module.exports = router;
