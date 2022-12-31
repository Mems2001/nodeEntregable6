const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const Posts = require('./posts.model');
const Users = require('./users.model');

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