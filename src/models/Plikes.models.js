const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Posts = require('./posts.models');
const Users = require('./users.models');

const PostLikes = db.define('post_likes' , {
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

module.exports = PostLikes