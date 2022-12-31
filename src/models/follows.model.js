const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');

const Follows = db.define('follows' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    userId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'followed' ,
        references: {
            key: 'id' ,
            model: Users
        } ,
        comment: 'followed'
    } ,
    user2Id: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'follower' ,
        references: {
            key: 'id' ,
            model: Users
        } ,
        comment: 'follower'
    }
});

module.exports = Follows