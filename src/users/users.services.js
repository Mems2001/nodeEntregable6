const usersControllers = require('./users.controllers');
const mailer = require('../utils/mailer');

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

const getMyUser = (req , res) => {
    const id = req.user.id;

    usersControllers.findMyUser(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getUserById = (req , res) => {
    const id = req.params.user_id;

    usersControllers.findUserById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            }
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
        .then(async(data) => {
            await mailer.sendMail({
                from: '<mems2001code@gmail.com>' ,
                to: `<${data.email}>` ,
                subject: `Bienvenido ${data.firstName}` ,
                html: `<h1>Bienvenido a nuestra app ${data.firstName}<h1>` ,
                text: 'Qué gusto tenerte con nosotros'
            });
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(err)
            res.status(400).json({
                message: err.message ,
                // err ,
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

const deleteUser = (req, res) => {
    const id = req.params.user_id;

    usersControllers.destroyUser(id)
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'User deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Unable to delete'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

module.exports = {
    registerUser ,
    getAllUsers ,
    getMyUser ,
    getUserById ,
    deleteUser
}