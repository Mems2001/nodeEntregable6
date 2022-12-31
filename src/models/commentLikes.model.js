const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');
const Comments = require('./comments.model');

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