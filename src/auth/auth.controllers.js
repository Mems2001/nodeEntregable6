const { findUserByEmail } = require("../users/users.controllers");
const { comparePass } = require("../utils/crypto");

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

module.exports = {
    checkCredentials
}