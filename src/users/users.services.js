const usersControllers = require('./users.controllers');

const getAllUsers = (req ,res) => {
    usersControllers.findAllUsers()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const registerUser = (req ,res) => {
    const {firstName , lastName , email , password , birthday , phone , nickName , profileImage , gender} = req.body;

    usersControllers.createUser({
        firstName , lastName , email , password , birthday , phone , nickName , profileImage , gender
    })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message ,
                fields: {
                    firstName: 'string' ,
                    lastName: 'string' ,
                    nickName: 'string' ,
                    email: 'email@test.com' ,
                    password: 'string' ,
                    birthday: 'YYYY/MM/DD' ,
                    phone: '0999999999' ,
                    profileImage: 'Url' ,
                    gender: 'string' 
                }
            })
        })
};

module.exports = {
    registerUser ,
    getAllUsers 
}