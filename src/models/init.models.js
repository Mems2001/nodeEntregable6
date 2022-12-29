const Comments = require("./comments.model");
const Follows = require("./follows.model");
const PasswordRecovery = require("./passwordRecovery.model");
const Plikes = require("./Plikes");
const Posts = require("./posts.model");
const Users = require("./users.model");

const initModels = () => {

    Users.hasMany(PasswordRecovery)
    PasswordRecovery.belongsTo(Users)

    Users.hasMany(Posts)
    Posts.belongsTo(Users)

    Users.hasMany(Plikes)
    Plikes.belongsTo(Users)

    Users.hasMany(Comments)
    Comments.belongsTo(Users)

    Posts.hasMany(Plikes)
    Plikes.belongsTo(Posts)

    Posts.hasMany(Comments)
    Comments.belongsTo(Posts)

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