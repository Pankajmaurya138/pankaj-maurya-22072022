const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.generateHash = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

exports.comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

exports.generatePassword = () => {
    let password = '';

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '123456789';
    const spcialChar = '@#%&*()+';
    const charactersLength = characters.length;

    for (let i = 0; i < 4; i += 1) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    for (let i = 0; i < 6; i += 1) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    for (let i = 0; i < 1; i += 1) {
        password += spcialChar.charAt(Math.floor(Math.random() * spcialChar.length));
    }

    return password;
};
