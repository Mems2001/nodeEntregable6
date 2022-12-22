const passport = require('passport');

const { findUserById } = require('../users/users.controllers');
const {JwtSecret} = require('../../config').api;

const {Strategy} = require('passport-jwt');
const {ExtractJwt} = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt') ,
    secretOrKey: JwtSecret
};

passport.use(
    new Strategy(options , (tokenDecoded , done) => {
        findUserById(tokenDecoded.id)
            .then(data => {
                if (data) {
                    done(null , tokenDecoded)
                } else {
                    done(null , false)
                }
            })
            .catch(err => {
                done(err , false)
            })
    })
);

module.exports = passport