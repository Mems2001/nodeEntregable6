require('dotenv').config();

module.exports = {
    api: {
        port: process.env.PORT ,
        host: process.env.HOST ,
        JwtSecret: process.env.JWT_KEY
    } ,
    db: {
        host: process.env.DB_HOST ,
        port: process.env.DB_PORT ,
        username: process.env.DB_USER ,
        password: process.env.DB_PASS ,
        name: process.env.DB_NAME
    }
}