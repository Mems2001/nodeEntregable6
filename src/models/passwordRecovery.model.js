const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');

const PasswordRecovery = db.define('password_recovery' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    userId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'user_id' ,
        references: {
            key: 'id' ,
            model: Users
        }
    } ,
    used: {
        type: DataTypes.BOOLEAN ,
        defaultValue: false
    }
});

module.exports = PasswordRecovery