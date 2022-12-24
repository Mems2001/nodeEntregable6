const commentsControllers = require('./comments.controllers');

const getMyComments = (req , res) => {
    const userId = req.user.id ;

    commentsControllers.findMyComments(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
} ;

const getCommentById = (req , res) => {
    const commentId = req.params.comment_id;

    commentsControllers.findCommentById(commentId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const patchMyComment = (req, res) => {
    const commentId = req.params.comment_id ;
    const userId = req.user.id ;
    const {content} = req.body ;

    commentsControllers.updateMyComment(commentId , userId , {
        content
    })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Comment updated'
                })
            } else {
                res.status(404).json({
                    message: 'Unable to update'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const deleteMyComment = (req , res) => {
    const commentId = req.params.comment_id ;
    const userId = req.user.id ;

    commentsControllers.destroyMyComment(commentId , userId)
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Comment deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Comment not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getAllLikesFromComment = (req ,res) => {
    const commentId = req.params.comment_id ;

    commentsControllers.findAllLikesFromComment(commentId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const postCommentLike = (req ,res) => {
    const commentId = req.params.comment_id ;
    const userId = req.user.id ;

    commentsControllers.createCommentLike(userId , commentId)
        .then(data => {
            if (data) {
                res.status(201).json(data)
            } else {
                res.status(400).json({
                    message: 'Comment has already been liked by you'
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
    getCommentById ,
    patchMyComment ,
    deleteMyComment ,
    getMyComments ,
    getAllLikesFromComment ,
    postCommentLike
}