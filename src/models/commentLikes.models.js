const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Users = require('./users.models');
const Comments = require('./comments.models');

const CommentLikes = db.define('comment_likes' , {
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
    commentId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'comment_id' ,
        references: {
            key: 'id' ,
            model: Comments
        }
    }
});

module.exports = CommentLikes