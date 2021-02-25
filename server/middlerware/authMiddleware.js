const jwt = require('jsonwebtoken');
const User = require('../model/User');
exports.authUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json(error)
            // throw new Error("Not authorized")
        }
    }
}