const router = require('express').Router();
const usersServices = require('./users.services');
const passportJWT = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/' , passportJWT.authenticate('jwt' , {session:false}) , roleMiddleware , usersServices.getAllUsers)
router.post('/register' , usersServices.registerUser)

router.route('/me')
    .get(passportJWT.authenticate('jwt' , {session:false}) , usersServices.getMyUser)
    .patch(passportJWT.authenticate('jwt' , {session:false}) , usersServices.patchMyUser)
    .delete(passportJWT.authenticate('jwt' , {session:false}) , usersServices.deleteMyUser)

router.route('/:user_id')
    .get(usersServices.getUserById)
    .patch(passportJWT.authenticate('jwt' , {session:false}) , roleMiddleware , usersServices.patchUser)
    .delete(passportJWT.authenticate('jwt' , {session:false}) , roleMiddleware , usersServices.deleteUser)

module.exports = router