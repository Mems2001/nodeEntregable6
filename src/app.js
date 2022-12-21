const express = require('express');
const app = express();

const config = require('../config');

app.use(express.json());

app.get('/' , (req ,res) => {
    res.status(200).json({
        message: 'Ok!!!'
    })
})

app.listen(config.api.port , () => {
    console.log(`Server started at port:${config.api.port}`)
})