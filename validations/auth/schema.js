/* eslint-disable max-len */
/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const signup = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    first_name: Joi.string().regex(/^[a-zA-Z]*$/, 'alphabets characters').min(1).max(30).trim().required(),
    last_name: Joi.string().regex(/^[a-zA-Z]*$/, 'alphabets characters').min(1).max(30).trim().required(),
    email: Joi.string().email().min(5).max(100),
    mobile_number: Joi.string().min(8).max(10).required(),
    user_type: Joi.array().items(
        Joi.string().valid(
          "CLIENT",
          "INSPECTION_MANAGER",
          "PROCUREMENT_MANAGER"
        )
      ).single(),
    password: Joi.string()
    
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .message(
            'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
        )
        .min(8)
        .max(20)
        .required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
   
});


const isProcurementSignup = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    first_name: Joi.string().regex(/^[a-zA-Z]*$/, 'alphabets characters').min(1).max(30).trim().required(),
    last_name: Joi.string().regex(/^[a-zA-Z]*$/, 'alphabets characters').min(1).max(30).trim().required(),
    email: Joi.string().email().min(5).max(100),
    mobile_number: Joi.string().min(8).max(10).required(),
    user_type: Joi.array().items(
        Joi.string().valid(
          "CLIENT",
          "INSPECTION_MANAGER",
        )
      ).single(),
    password: Joi.string()
    
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .message(
            'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
        )
        .min(8)
        .max(20)
        .required(),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
   
});


const login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    user_type: Joi.array().items(
        Joi.string().valid(
          "CLIENT",
          "PROCUREMENT_MANAGER"
        )
      ).single(),
});

const inspectionManagerLogin = Joi.object({
    mobile_number: Joi.string().required(),
    password: Joi.string().required(),
    user_type: Joi.array().items(
        Joi.string().valid(
          "INSPECTION_MANAGER",
        )
      ).single(),
   
});

const assignInspectionManager = Joi.object({
    procure_manager_user_id: Joi.string().required(),
    inspection_manager_user_id: Joi.string().required(),
});



module.exports = {
    signup,
    login,
    inspectionManagerLogin,
    isProcurementSignup,
    assignInspectionManager
};
