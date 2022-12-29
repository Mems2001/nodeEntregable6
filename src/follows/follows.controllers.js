const Follows = require('../models/follows.model');
const uuid = require('uuid');
const Users = require('../models/users.model');

const followUser = async(followerId , followedId) => {
    const verify = await Follows.findOne({
        where: {
            userId: followedId ,
            user2Id: followerId
        }
    });

    if (verify) {
        const value = await Follows.destroy({
            where: {
               id: verify.id
            }
        }) ;
        return value
    } else {
        const data = await Follows.create({
            id: uuid.v4() ,
            userId: followedId ,
            user2Id: followerId
        });
        return data
    }
}; 

const findMyFollowers = async(userId) => {
    const data = await Follows.findAll({
        where: {
            userId
        } , include: {
            model: Users ,
            attributes: [
                'id' ,
                'firstName' ,
                'lastName' ,
                'nickName'
            ] ,
            as: 'follower'
        }
    });
    return data.map(follower => follower.follower)
};

const findMyFollowed = async(user2Id) => {
    const data = await Follows.findAll({
        where: {
            user2Id
        } , include: {
            model: Users ,
            attributes: [
                'id' ,
                'firstName' ,
                'lastName' ,
                'nickName'
            ] ,
            as: 'followed'
        }
    });
    return data.map(followed => followed.followed)
}

module.exports = {
    followUser ,
    findMyFollowers ,
    findMyFollowed
}