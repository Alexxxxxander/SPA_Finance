const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { login, password } = req.body;

    try {
        const userExists = await User.findOne({ login });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ login, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('token', token,{
            httpOnly:true,
            maxAge: 36000
        })
        res.status(200).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const login = async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.cookie('token', token,{
            httpOnly:true,
            secure: false,
            maxAge: 36000
        })
        res.status(200).json({ message: 'Logged in' });
        res.send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) =>{
    res.cookie('token', '',{
        httpOnly:true
    });
  res.status(200).json('removed cookie');
};

module.exports = { register, login, logout};
