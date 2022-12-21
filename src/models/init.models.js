const Comments = require("./comments.model");
const PostLikes = require("./PostLikes.model");
const Posts = require("./posts.model");
const Users = require("./users.model");

const initModels = () => {

    Users.hasMany(Posts)
    Posts.belongsTo(Users)

    Users.hasMany(PostLikes)
    PostLikes.belongsTo(Users)

    Users.hasMany(Comments)
    Comments.belongsTo(Users)

    Posts.hasMany(PostLikes)
    PostLikes.belongsTo(Posts)

    Posts.hasMany(Comments)
    Comments.belongsTo(Posts)

};

module.exports = initModels