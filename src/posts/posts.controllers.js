const Posts = require('../models/posts.models');
const uuid = require('uuid');
const Users = require('../models/users.models');
const { findUserById } = require('../users/users.controllers');
const Comments = require('../models/comments.models');
const Plikes = require('../models/Plikes.models');

const createPost = async(obj , userId) => {
    const newPost = await Posts.create({
        id: uuid.v4() ,
        userId ,
        content: obj.content
    });
    return newPost
};

const findAllPosts = async() => {
    return await Posts.findAll({
        include: {
            model: Users ,
            attributes: {
                exclude: [
                    'email' ,
                    'password' ,
                    'birthday' ,
                    'phone' ,
                    'createdAt' ,
                    'updatedAt' ,
                    'role' ,
                    'status' ,
                    'isVerified'
                ]
            }
        } ,
        attributes: {
            exclude: [
                'userId'
            ]
        }
    })
};

const findMyPosts = async(id) => {
    return await Posts.findAll({
        where: {
            userId : id
        } ,
        attributes: {
            exclude: [
                'userId'
            ]
        }
    })
};

const findPostById = async(id) => {
    return await Posts.findOne({
        where: {
            id
        } ,
        include: {
            model: Users ,
            attributes: {
                exclude: [
                    'password' ,
                    'email' ,
                    'createdAt' ,
                    'updatedAt' ,
                    'birthday' ,
                    'phone' ,
                    'role' ,
                    'status' ,
                    'isVerified'
                ]
            }
        } ,
        attributes: {
            exclude: [
                'userId'
            ]
        }
    })
};

const updateMyPost = async(obj , userId , postId) => {
    const data = await Posts.update(obj , {
        where: {
            id : postId ,
            userId : userId
        }
    });
    return data[0]
};

const destroyMyPost = async(obj) => {
    const data = await Posts.destroy({
        where: {
            id: obj.postId ,
            userId: obj.userId
        }
    });
    return data
};

const findOtherUserPosts = async(id) => {
    try {
        const user = await findUserById(id);
        // console.log(user)
        if (user) {
            return await Posts.findAll({
                where: {
                    userId: id
                } ,
                attributes: {
                    exclude: [
                        'userId'
                    ]
                }
            })
        } else {
            return 'notUser'
        }
    } catch (error) {
        return null
    }
};

// Comments controllers
const createComment = async(obj) => {
    const data = await Comments.create({
        id: uuid.v4() ,
        postId: obj.postId ,
        userId: obj.userId ,
        content: obj.content
    });
    return data
};

const findCommentsFromPost = async(postId) => {
    return await Comments.findAll({
        where: {
            postId
        } ,
        attributes: {
            exclude: [
                'postId' ,
                'userId'
            ]
        } ,
        include: {
            model: Users ,
            attributes: {
                exclude: [
                    'password' ,
                    'email' ,
                    'phone' ,
                    'role' ,
                    'status' ,
                    'isVerified' ,
                    'createdAt' ,
                    'updatedAt' ,
                    'birthday'
                ]
            }
        }
    })
};

// Posts likes controllers
const findAllLikesFromPost = async(postId) => {
    const data = await Plikes.findAll({
        where: {
            postId
        } ,
        include: {
            model: Users ,
            attributes: {
                exclude: [
                    'email' ,
                    'password' ,
                    'birthday' ,
                    'phone' ,
                    'role' ,
                    'status' ,
                    'createdAt' ,
                    'updatedAt' ,
                    'isVerified'
                ]
            }
        } ,
        attributes: {
            exclude: [
                'postId' ,
                'userId'
            ]
        }
    });
    return data.map(like => like.user)
};

const createPostLike = async(userId, postId) => {
    const verify = await Plikes.findOne({
        where: {
            userId ,
            postId
        }
    });

    if (!verify) {
        return await Plikes.create({
            id: uuid.v4() ,
            postId ,
            userId
        })
    } else {
        const data = await Plikes.destroy({
            where: {
                id: verify.id
            }
        });
        return data
    }

};

// Comments likes

module.exports = {
    createPost ,
    findAllPosts ,
    findMyPosts ,
    findPostById ,
    updateMyPost ,
    destroyMyPost ,
    findOtherUserPosts ,
    // Comments
    createComment ,
    findCommentsFromPost ,
    // Post likes
    findAllLikesFromPost ,
    createPostLike
}