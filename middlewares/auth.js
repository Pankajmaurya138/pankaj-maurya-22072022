/* eslint-disable require-await */
/* eslint-disable no-console */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_TOKEN_SECRET
const dbConnection = require('../models/index');

exports.GenerateAuthJwt = (payload) => {
    const { expires_in, ...data } = payload;
    const token = jwt.sign(data, secretKey, { expiresIn: expires_in });
    if (!token) {
        return false;
    }
    return token;
};

exports.VerifyAuthToken = (req, res, next) => {
    try {
        const token = req.headers.access_token;
        if (!token) {
            return res.status(200).send({ auth: false, message: 'No token provided.' });
        }
        console.log('🚀 ~ file: auth.js ~ line 49 ~ jwt.verify ~ error', secretKey);
        console.log('🚀 ~ file: auth.js ~ line 49 ~ jwt.verify ~ error', token);
        jwt.verify(token, secretKey, async (error, decoded) => {
            if (error) {
                console.log('🚀 ~ file: auth.js ~ line 49 ~ jwt.verify ~ error', error);
                return res.status(500).json({ message: 'Invalid token' });
            }
            const { Auth } = await dbConnection();
            const checkJwt = await Auth.findOne({
                where: { access_token: token }
            });
            if (!checkJwt) {
                return res.status(500).json({ message: 'Invalid token' });
            }
            else {
                req.data = decoded;
                return next();
            }
        });
    }
    catch (error) {
        console.log('🚀 ~ file: auth.js ~ line 38 ~ exports.verifyAuthToken=async ~ error', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.IsInspectionManager = (req, res, next) => {
    try {
    // check role
        const jwtData = req.data;
        if (jwtData.user_type !== 'INSPECTION_MANAGER') {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        
        if (jwtData.status === '0' ) {
            return res.status(403).json({ message: 'Please verify yourself first.' });
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (error) {
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsInspectionManager= ~ error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// it includes both SUPERADMIN or PROCUREMENT_MANAGER
exports.IsProcurementManager = (req, res, next) => {
    try {
    // check role
        const jwtData = req.data;
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsProcurementManager= ~ jwtData', jwtData);
        if (jwtData.user_type !== 'PROCUREMENT_MANAGER') {
            return res.status(500).json({ message: 'Unauthorized access' });
        }
       
        if (jwtData.status === '0' ) {
            return res.status(500).json({ message: 'Please verify yourself first.' });
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (error) {
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsProcurementManager= ~ error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.IsClient = (req, res, next) => {
    try {
    // check role
        const jwtData = req.data;
        console.log('🚀 ~ file: auth.js ~ line 20 ~ exports.IsClient= ~ jwtData', jwtData);
        if (jwtData.user_type !== 'CLIENT') {
            return res.status(500).json({ message: 'Unauthorized access' });
        }
        
        if (jwtData.status === '0' ) {
            return res.status(500).json({ message: 'Please verify yourself first.' });
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (error) {
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsClient= ~ error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// it includes both SUPERADMIN
exports.IsSuperAdmin = (req, res, next) => {
    try {
    // check role
        const jwtData = req.data;
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsCompany= ~ jwtData', jwtData);
        if(jwtData.user_type !== 'SUPERADMIN') {
            return res.status(500).json({ message: 'Unauthorized access' });
        }
        
        if (jwtData.status === '0' ) {
            return res.status(500).json({ message: 'Please verify yourself first.' });
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (error) {
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsCompany= ~ error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// isOrderStatusUpdate // 

exports.IsOrderStatusUpdate = (req, res, next) => {
    try {
    // check role
        const jwtData = req.data;
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsOrderStatusUpdate= ~ jwtData', jwtData);
        let ROLES = ['PROCUREMENT_MANAGER','INSPECTION_MANAGER','SUPERADMIN'];
        if(!ROLES.includes(jwtData.user_type)) {
            return res.status(500).json({ message: 'Unauthorized access' });
        }
        
        if (jwtData.status === '0' ) {
            return res.status(500).json({ message: 'Please verify yourself first.' });
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (error) {
        console.log('🚀 ~ file: auth.js ~ line 18 ~ exports.IsOrderStatusUpdate= ~ error', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


  