const {DataTypes} = require('sequelize');
const db = require('../utils/dataBase');
const Users = require('./users.models');

const Posts = db.define('posts' , {
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
    content: {
        type: DataTypes.TEXT ,
        allowNull: false
    }
});

module.exports = Posts