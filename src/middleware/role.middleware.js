const roleMiddleware = (req, res , next) => {
    if ( req.user.role == 'admin' ) {
        next()
    } else {
        res.status(401).json({
            message: 'Permision denied'
        })
    }
};

module.exports = roleMiddleware