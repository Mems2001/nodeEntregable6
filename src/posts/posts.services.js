const postsControllers = require('./posts.controllers');

const postPost = (req , res) => {
    const {content} = req.body;
    const userId = req.user.id;

    postsControllers.createPost({
        content
    } , userId)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getAllPosts = (req , res) => {
    postsControllers.findAllPosts()
        .then(data => {
            res.status(200).json(data)
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
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            }
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
       content
    } , userId , postId)
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
            if (data && data !== 'notUser') {
                res.status(200).json(data)
            } else if (data == 'notUser') {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

// Comments services
const postComment = (req, res) => {
    const postId = req.params.post_id ;
    const userId = req.user.id ;
    const {content} = req.body ;

    postsControllers.createComment({
        postId , userId , content
    })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getCommentsFromPost = (req ,res) => {
    const postId = req.params.post_id;

    postsControllers.findCommentsFromPost(postId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

// Post Likes services
const getAllLikesFromPost = (req , res) => {
    const postId = req.params.post_id 

    postsControllers.findAllLikesFromPost(postId)
        .then(data => {
            res.status(200).json({
                count: data.length ,
                likes: data
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const postPostLike = (req , res) => {
    const postId = req.params.post_id ;
    const userId = req.user.id ;

    postsControllers.createPostLike(userId , postId)
        .then(data => {
            if (data) {
                res.status(201).json(data)
            } else {
                res.status(400).json({
                    message: 'You already liked this post'
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
    postPost ,
    getAllPosts ,
    getMyposts ,
    getPostById ,
    patchMyPost ,
    deleteMyPost ,
    getOtherUserPosts ,
    // Comments
    postComment ,
    getCommentsFromPost ,
    // Post likes
    getAllLikesFromPost ,
    postPostLike
}