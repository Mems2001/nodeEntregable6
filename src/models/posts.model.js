const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');

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