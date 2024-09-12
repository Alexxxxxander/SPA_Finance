const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, "your_jwt_secret");
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const tokenNew = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: '1h' });
        res.cookie('token', tokenNew, {
            httpOnly: true,
            maxAge: 3600000
        });
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token: ', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = protect;