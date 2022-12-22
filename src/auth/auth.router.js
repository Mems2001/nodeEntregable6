const router = require('express').Router();
const authServices = require('./auth.services');

router.post('/login' , authServices.postLogin);

router.post('/password_recovery' , authServices.postRecoveryToken);

router.patch('/password_recovery/:token_id' , authServices.patchPassword);

module.exports = router