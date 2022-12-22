const router = require('express').Router();
const usersServices = require('./users.services');

router.get('/' , usersServices.getAllUsers)
router.post('/register' , usersServices.registerUser)

module.exports = router