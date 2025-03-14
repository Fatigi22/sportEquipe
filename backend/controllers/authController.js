const User = require('../models/User');
const generateToken = require('../config/jwtConfig');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email used' });

        const user = await User.create({ name, email, password, role });
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            });
        } else {
            res.status(401).json({ message: 'Incorrect email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};