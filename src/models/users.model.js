const {DataTypes} = require('sequelize');
const db = require('../utils/dataBase');

const Users = db.define('users' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    firstName: {
        type: DataTypes.STRING ,
        allowNull: false ,
        field: 'first_name' ,
        validate: {
            len: [1 , 50]
        }
    } ,
    lastName: {
        type: DataTypes.STRING ,
        allowNull: false ,
        field: 'last_name' ,
        validate: {
            len: [1 , 50]
        }
    } ,
    email: {
        type: DataTypes.STRING ,
        allowNull: false ,
        unique: true ,
        validate: {
            isEmail: true 
        }
    } ,
    password: {
        type: DataTypes.STRING ,
        allowNull: false ,
        validate: {
            min: 5
        }
    } ,
    birthday: {
        type: DataTypes.DATEONLY ,
        allowNull: false
    } ,
    phone: {
        type: DataTypes.STRING ,
        unique: true
    } ,
    nickName: {
        type: DataTypes.STRING ,
        allowNull: false ,
        unique: true ,
        field: 'nick_name'
    } ,
    profileImage: {
        type: DataTypes.STRING ,
        field: 'profile_image' ,
        validate: {
            isUrl: true
        }
    } ,
    gender: {
        type: DataTypes.STRING
    } ,
    role: {
        type: DataTypes.STRING ,
        defaultValue: 'normal'
    } ,
    status: {
        type: DataTypes.STRING ,
        defaultValue: 'active'
    } ,
    isVerified: {
        type: DataTypes.BOOLEAN ,
        defaultValue: false ,
        field: 'is_verified'
    }
});

module.exports = Users