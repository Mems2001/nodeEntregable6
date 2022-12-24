const postsServices = require('./posts.services');
const router = require('express').Router();
const PassportJWT = require('../middleware/auth.middleware');

router.route('/')
    .get(postsServices.getAllPosts)
    .post(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.postPost)

router.route('/me')
    .get(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.getMyposts)

router.route('/:post_id')
    .get(postsServices.getPostById)
    .patch(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.patchMyPost)
    .delete(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.deleteMyPost)

router.route('/:post_id/likes')
    .get(postsServices.getAllLikesFromPost)
    .post(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.postPostLike)

router.route('/:post_id/comments')
    .get(postsServices.getCommentsFromPost)
    .post(PassportJWT.authenticate('jwt' , {session:false}) , postsServices.postComment)

router.route('/users/:user_id')
    .get(postsServices.getOtherUserPosts)

module.exports = router