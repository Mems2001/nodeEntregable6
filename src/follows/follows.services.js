const followsControllers = require('./follows.controllers');

const postFollower = (req , res) => {
    const followerId = req.user.id ;
    const followedId = req.params.user_id ;

    followsControllers.followUser(followerId , followedId)
        .then(data => {
            if (data !== 1) {
            res.status(201).json(data)
            } else {
                res.status(200).json({
                    message: `User ${followedId} unfollowed`
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getMyFollowers = (req , res) => {
    const userId = req.user.id;

    followsControllers.findMyFollowers(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getMyFollowed = (req , res) => {
    const user2Id = req.user.id;

    followsControllers.findMyFollowed(user2Id)
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
    postFollower ,
    getMyFollowers ,
    getMyFollowed
}