const commentsServices = require('./comments.services');
const router = require('express').Router();
const PassportJWT = require('../middleware/auth.middleware');

router.get('/me' , PassportJWT.authenticate('jwt' , {session:false}) , commentsServices.getMyComments)

router.route('/:comment_id')
    .get(commentsServices.getCommentById)
    .patch(PassportJWT.authenticate('jwt' , {session:false}) , commentsServices.patchMyComment)
    .delete(PassportJWT.authenticate('jwt' , {session:false}) , commentsServices.deleteMyComment)

router.route('/:comment_id/likes')    
    .post(PassportJWT.authenticate('jwt' , {session:false}) , commentsServices.postCommentLike)
    .get(PassportJWT.authenticate('jwt' , {session:false}) , commentsServices.getAllLikesFromComment)

module.exports = router