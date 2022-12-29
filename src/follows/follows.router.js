const followsServices = require('./follows.services');
const router = require('express').Router();
const passportJWT = require('../middleware/auth.middleware');

router.get('/followers' , passportJWT.authenticate('jwt' , {session:false}) , followsServices.getMyFollowers)
router.get('/follows' , passportJWT.authenticate('jwt' , {session:false}) , followsServices.getMyFollowed)

module.exports = router