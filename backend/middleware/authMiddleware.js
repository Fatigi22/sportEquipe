const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            const message = error.name === 'TokenExpiredError' ?
                'The token has expired, please reconnect' :
                'Not allowed, token invalid';
            res.status(401).json({ message });
        }
    } else {
        res.status(401).json({ message: 'Not allowed, no token' });
    }
};

module.exports = { protect };