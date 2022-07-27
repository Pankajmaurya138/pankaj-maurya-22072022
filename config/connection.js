const { env } = process;

const { Sequelize } = require('sequelize');
const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
});

module.exports = db;
