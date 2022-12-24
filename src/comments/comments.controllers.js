const Comments = require('../models/comments.model');
const uuid = require('uuid');
const Posts = require('../models/posts.model');
const Users = require('../models/users.model');
const CommentLikes = require('../models/commentLikes.model');

const findMyComments = async(userId) => {
    return await Comments.findAll({
        where: {
            userId
        } ,
        include: {
            model: Posts ,
            attributes: {
                exclude: [
                    'createdAt' ,
                    'updatedAt'
                ]
            }
        } ,
        attributes: {
            exclude: [
                'userId' ,
                'postId'
            ]
        }
    })
} ;

const findCommentById = async(commentId) => {
    return await Comments.findOne({
        where: {
            id: commentId
        } ,
        include: {
            model: Posts ,
            attributes: {
                exclude: [
                    'userId' ,
                    'createdAt' ,
                    'updatedAt'
                ]
            } ,
            include: {
                model: Users ,
                attributes: {
                    exclude: [
                        'email' ,
                        'password' ,
                        'createdAt' ,
                        'updatedAt' ,
                        'birthday' ,
                        'phone' ,
                        'role' ,
                        'status' ,
                        'isVerified'
                    ]
                }
            }
        } ,
        attributes: {
            exclude: [
                'userId' ,
                'postId'
            ]
        }
    })
};

const updateMyComment = async(commentId , userId , obj) => {
    const data = await Comments.update(obj , {
        where: {
            id: commentId ,
            userId
        }
    })
    return data[0]
};

const destroyMyComment = async(commentId , userId) => {
    return await Comments.destroy({
        where: {
            id: commentId ,
            userId
        }
    })
};

const createCommentLike = async(userId , commentId) => {
    const verify = await CommentLikes.findOne({
        where:  {
            userId ,
            commentId
        }
    });

    if (!verify) {
        return await CommentLikes.create({
            id: uuid.v4() ,
            userId ,
            commentId
        })
    } else {
        return null
    }
};

const findAllLikesFromComment = async(commentId) => {
    return await CommentLikes.findAll({
        where: {
            commentId
        }
    })
};

module.exports = {
    findMyComments ,
    findCommentById ,
    updateMyComment ,
    destroyMyComment ,
    createCommentLike ,
    findAllLikesFromComment
}