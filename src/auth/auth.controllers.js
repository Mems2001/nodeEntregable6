const PasswordRecovery = require("../models/passwordRecovery.model");
const { findUserByEmail, updateUser } = require("../users/users.controllers");
const { comparePass, hashPass } = require("../utils/crypto");
const uuid = require('uuid');

const checkCredentials = async(email , plainPass) => {
    try {
        const user = await findUserByEmail(email);
        console.log(user);
        const verification = await comparePass(plainPass , user.password)
        if (verification) {
            return user
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
        return null
    }
};

const createRecoveryToken = async(email) => {
    try {
        const user = await findUserByEmail(email);
        const data = await PasswordRecovery.create({
            id: uuid.v4() ,
            userId: user.id
        });
        return data
    } catch (error) {
        return error
    }
};

const updatePassword = async(tokenId , newPass) => {
    const recovery = await PasswordRecovery.findOne({
        where: {
            id: tokenId ,
            used: false
        }
    });
    if (recovery) {
        await PasswordRecovery.update({
            used: true
        } , {where: {
            id: tokenId
        }});
        const data = await updateUser({
            password: hashPass(newPass)
        } , recovery.userId);
        return data
    } else {
        return false
    }
};

module.exports = {
    checkCredentials ,
    createRecoveryToken ,
    updatePassword
}