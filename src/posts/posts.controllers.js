const Posts = require('../models/posts.model');
const uuid = require('uuid');
const Users = require('../models/users.model');

const createPost = async(obj) => {
    const newPost = await Posts.create({
        id: uuid.v4() ,
        userId: obj.userId ,
        content: obj.content
    });
    return newPost
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

const updateMyPost = async(obj) => {
    const data = await Posts.update(obj , {
        where: {
            id : obj.postId ,
            userId : obj.userId
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
};

module.exports = {
    createPost ,
    findMyPosts ,
    findPostById ,
    updateMyPost ,
    destroyMyPost ,
    findOtherUserPosts
}