const Users = require('../models/users.models');
const { hashPass } = require('../utils/crypto');
const uuid = require('uuid');

const findAllUsers = async() => {
    return await Users.findAll()
};

const findUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
};

const findUserById = async(id) => {
    return await Users.findOne({
        where: {
            id
        } ,
        attributes: {
            exclude: [
                'password' ,
                'role' ,
                'status' ,
                'isVerified' ,
                'email' ,
                'phone'
            ]
        }
    })
};

const findMyUser = async(id) => {
    return await Users.findOne({
        where: {
            id
        } ,
        attributes: {
            exclude: [
                'role' ,
                'status' ,
                'isVerified' ,
                'password'
            ]
        }
    })
};

const createUser = async(obj) => {
    return await Users.create({
        id: uuid.v4() ,
        firstName: obj.firstName ,
        lastName: obj.lastName ,
        email: obj.email ,
        password: hashPass(obj.password) ,
        birthday: obj.birthday ,
        phone: obj.phone ,
        nickName: obj.nickName ,
        profileImage: obj.profileImage ,
        gender: obj.gender
    })
} ;

const destroyUser = async(id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    });
    return data
};

const updateUser = async(obj , userId) => {
    const data = await Users.update(obj , {
        where: {
            id: userId
        }
    });
    return data[0]
};

module.exports = {
    findAllUsers ,
    findUserByEmail ,
    findUserById ,
    findMyUser ,
    createUser ,
    destroyUser ,
    updateUser
}