const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    console.log('Cookie: ', req.cookies);
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const userId = req.user.id
        const tokenNew = jwt.sign({ id: userId }, "your_jwt_secret", { expiresIn: '1h' });
        res.cookie('token', tokenNew, {
            httpOnly: true,
            maxAge: 360000
        });
        next();
    } catch (error) {
        res.status(401).json({message: 'Not authorized, token failed'});
    }
};

module.exports = protect;
