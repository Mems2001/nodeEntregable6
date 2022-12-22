const postsServices = require('./posts.services');
const router = require('express').Router();
const PassportJWT = require('../middleware/auth.middleware');

router.route('/')
    .post(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.postPost)

router.route('/me')
    .get(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.getMyposts)

router.route('/:post_id')
    .get(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.getPostById)
    .patch(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.patchMyPost)
    .delete(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.deleteMyPost)

router.route('/users/:user_id')
    .get(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.getOtherUserPosts)

module.exports = router