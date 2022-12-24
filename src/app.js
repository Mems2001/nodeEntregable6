const express = require('express');
const app = express();

const config = require('../config');
const initModels = require('./models/init.models');
const db = require('./utils/dataBase');
//Router
const authRouter = require('./auth/auth.router');
const usersRouter = require('./users/users.router');
const postsRouter = require('./posts/posts.router');
const commentsRouter = require('./comments/comments.router');

app.use(express.json());

db.authenticate()
    .then(() => {
        console.log('dataBase authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('dataBase synced')
    })
    .catch(err => {
        console.log(err)
    })

initModels()
    
app.get('/' , (req ,res) => {
    res.status(200).json({
        message: 'Ok!!!'
    })
});

    // Routes
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/users' , usersRouter);
app.use('/api/v1/posts' , postsRouter);
app.use('/api/v1/comments' , commentsRouter);

app.listen(config.api.port , () => {
    console.log(`Server started at port:${config.api.port}`)
})