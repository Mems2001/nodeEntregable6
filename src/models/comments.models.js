const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Users = require('./users.models');
const Posts = require('./posts.models');

const Comments = db.define('comments' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    content: {
        type: DataTypes.TEXT ,
        allowNull: false
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
    postId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'post_id' ,
        references: {
            key: 'id' ,
            model: Posts
        }
    }
});

module.exports = Comments