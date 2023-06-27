const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const { SECRET } = require('../config/secretAndTokenConfig');

exports.register = async (userData) => {
    const email = await User.findOne({ email: userData.email});

    if (email) { 
        throw new Error('Email already exists');
    }

    const createUser = await User.create(userData);

    const token = await generateToken(createUser);
    
    return token;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Cannot find email');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid Password');
    }

    const token = await generateToken(user);

    return token;
}

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
}