const router = require('express').Router();
const usersServices = require('./users.services');
const passportJWT = require('../middleware/auth.middleware');

router.get('/' , usersServices.getAllUsers)
router.post('/register' , usersServices.registerUser)

router.get('/me' , passportJWT.authenticate('jwt' , {session:false}) , usersServices.getMyUser)

router.route('/:user_id')
    .get(usersServices.getUserById)
    .delete(usersServices.deleteUser)

module.exports = router