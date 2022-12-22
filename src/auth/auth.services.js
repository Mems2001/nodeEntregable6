const authControllers = require('./auth.controllers');
const jwt = require('jsonwebtoken');
const {JwtSecret} = require('../../config').api;
const mailer = require('../utils/mailer');
const config = require('../../config');

const postLogin = (req, res) => {
    const {password , email} = req.body;

    if (email && password) {
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
    } else {
        res.status(400).json({
            message: 'Missing data' ,
            fields: {
                email: 'email@test.com' ,
                password: 'string'
            }
        })
    }
};

const postRecoveryToken = (req, res) => {
    const {email} = req.body ;
    
    if (email) {
        authControllers.createRecoveryToken(email)
            .then(async(data) => {
                if (data) {
                    await mailer.sendMail({
                        from: `<${config.api.email}>` ,
                        to: `<${email}>` ,
                        subject: 'Password Recovery' ,
                        html: `<a href='${config.api.host}/api/v1/auth/password_recovery/${data.id}'>Password recovery link</a>`
                    });
                    res.status(200).json({
                        message: 'Email sended!, Check your inbox!'
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    } else {
        res.status(400).json({
            message: 'Email needed'
        })
    }
};

const patchPassword = (req , res) => {
    const tokenId = req.params.token_id ;
    const {password} = req.body ;

    authControllers.updatePassword(tokenId , password)
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Password updated'
                })
            } else {
                res.status(400).json({
                    message: 'URL expired'
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
    postLogin ,
    postRecoveryToken ,
    patchPassword
}