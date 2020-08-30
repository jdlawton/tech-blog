const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//important info is stored in .env file, JAWSDB is for hosting on heroku.
if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;


