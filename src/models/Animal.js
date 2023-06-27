const mongoose = require('mongoose');

const User = require('../models/User');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be atleast 2 characters'],
    },
    years: {
        type: String,
        required: [true, 'Years are required'],
        min: 1,
        max: 100,
    },
    kind: {
        type: String,
        required: [true, 'Kind is required'],
        minLength: [3, 'Kind should be atleast 3 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: [/^https?:\/\//, 'Invalid URL for image']
    },
    need: {
        type: String,
        required: [true, 'Need is required'],
        minLenght: 3,
        MaxLenght: 20,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        minLenght: 5,
        MaxLenght: 15
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLenght: 5,
        MaxLenght: 50
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    donation: [
        {
            user: {
                type: String,
                ref: 'User'
            }
        }
    ]
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;