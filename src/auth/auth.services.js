const authControllers = require('./auth.controllers');
const jwt = require('jsonwebtoken');
const {JwtSecret} = require('../../config').api;

const postLogin = (req, res) => {
    const {password , email} = req.body;

    authControllers.checkCredentials(email , password)
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    id: data.id ,
                    email: data.email ,
                    role: data.role
                } , JwtSecret);
                res.status(200).json({
                    message: 'Right credentials' ,
                    token
                })
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
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
    postLogin
}