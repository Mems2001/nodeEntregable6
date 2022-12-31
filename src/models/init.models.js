const CommentLikes = require("./commentLikes.models");
const Comments = require("./comments.models");
const Follows = require("./follows.models");
const PasswordRecovery = require("./passwordRecovery.models");
const Plikes = require("./Plikes.models");
const Posts = require("./posts.models");
const Users = require("./users.models");

const initModels = () => {

    Users.hasMany(PasswordRecovery)
    PasswordRecovery.belongsTo(Users)

    Users.hasMany(Posts)
    Posts.belongsTo(Users)

    Users.hasMany(Plikes)
    Plikes.belongsTo(Users)

    Users.hasMany(Comments)
    Comments.belongsTo(Users)

    Users.hasMany(CommentLikes)
    CommentLikes.belongsTo(Users)

    Posts.hasMany(Plikes)
    Plikes.belongsTo(Posts)

    Posts.hasMany(Comments)
    Comments.belongsTo(Posts)

    Comments.hasMany(CommentLikes)
    CommentLikes.belongsTo(Comments)

    //Followers
    Users.hasMany(Follows)
    Follows.belongsTo(Users , {
        as: 'follower' ,
        foreignKey: 'user2Id'
    })

    //Followed
    Follows.belongsTo(Users, {
        as: 'followed' ,
        foreignKey: 'userId'
    })

};

module.exports = initModels