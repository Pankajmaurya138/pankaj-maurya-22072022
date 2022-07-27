/* eslint-disable eqeqeq */
/* eslint-disable new-cap */
/* eslint-disable no-console */
const { v4: uuidv4 } = require('uuid');

exports.GenUUID = () => {
    const uuid = uuidv4();
    return uuid;
};

exports.GenerateOtp = (digit) => {
    const otp = Math.floor(
        10 ** (digit - 1) + Math.random() * (10 ** (digit - 1) * 9)
    );
    return otp;
};

