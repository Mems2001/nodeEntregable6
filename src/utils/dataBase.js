const config = require('../../config');
const {Sequelize} = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres' ,
    host: config.db.host ,
    username: config.db.username ,
    password: config.db.password ,
    database: config.db.name ,
    port: config.db.port ,
    dialectOptions: 
        process.env.NODE_ENV === 'production'
        ? {
            ssl: {
                require: true ,
                rejectUnauthorized: false
            }
        } : {

        }
});

module.exports = db