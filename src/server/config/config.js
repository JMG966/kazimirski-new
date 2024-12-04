const path = require('path');
require('dotenv').config();

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../../', process.env.DB_PATH),
        logging: false
    },
    production: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../../../', process.env.DB_PATH),
        logging: false
    }
};
