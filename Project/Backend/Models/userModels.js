const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!']
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userShema);

module.exports = userModel;