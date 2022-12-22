const bcrypt = require('bcrypt');

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass , 10)
};

const comparePass = (plainPass , hashedPass) => {
    return bcrypt.compareSync(plainPass , hashedPass)
};

// console.log(comparePass('1test' , '$2b$10$ItRLkOjbHe9mov/C9g1XUuMK/FrCIX.mhRIn5gpUwwJMe3lKTA7Ua'))

module.exports = {
    hashPass ,
    comparePass
}