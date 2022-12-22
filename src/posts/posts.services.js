const postsControllers = require('./posts.controllers');

const postPost = (req , res) => {
    const {content} = req.body;
    const userId = req.user.id;

    postsControllers.createPost({
        content , userId
    })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getMyposts = (req , res) => {
    const id = req.user.id;

    postsControllers.findMyPosts(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getPostById = (req ,res) => {
    const id = req.params.post_id;

    postsControllers.findPostById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const patchMyPost = (req , res) => {
    const postId = req.params.post_id;
    const userId = req.user.id;
    const {content} = req.body;

    postsControllers.updateMyPost({
        postId , userId , content
    })
        .then(data => {
            if (data !== 0) {
                res.status(201).json({
                    message: 'Post updated'
                })
            } else if (data == 0) {
                res.status(404).json({
                    message: 'Unable tu update'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const deleteMyPost = (req, res) => {
    const userId = req.user.id;
    const postId = req.params.post_id;

    postsControllers.destroyMyPost({
        userId , postId
    })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Post deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Unable to delete'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getOtherUserPosts = (req , res) => {
    const id = req.params.user_id;

    postsControllers.findOtherUserPosts(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

module.exports = {
    postPost ,
    getMyposts ,
    getPostById ,
    patchMyPost ,
    deleteMyPost ,
    getOtherUserPosts
}