const router = require('express').Router();
const authDataValidation = require('../validations/auth');
const authController = require('../controller/admin/auth.controller');
const procureAuthController = require('../controller/procurement_manager/auth.controller');
const OrderController = require('../controller/procurement_manager/order.controller')
const CheckListController = require('../controller/procurement_manager/checklist.controller')
const jwtVerify = require('../middlewares/auth');


router.post(
    '/users/signup',
    authDataValidation.procurementManagerSignUp,
    procureAuthController.IsUserExist,
    authController.IsUserMobileExist,
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsProcurementManager,
    procureAuthController.signup,
   
);

router.post(
    '/createOrder',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsProcurementManager,
    OrderController.createOrder,
   
);

router.get(
    '/getCheckList',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsProcurementManager,
    CheckListController.GetCheckList,
   
);

router.post(
    '/upload_check_list_file',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsProcurementManager,
    // orderValidation.uploadFile,
    OrderController.uploadFile,
);


router.get(
    '/getAllInspectionManager',
    jwtVerify.VerifyAuthToken,
    jwtVerify.IsProcurementManager,
    procureAuthController.GetAllAssignedInspectionManager,
   
);



module.exports = router;
