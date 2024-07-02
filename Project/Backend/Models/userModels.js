const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    lastname: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    username: {
        type: String,
        required: [true, 'Please tell us your username!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!']
    },
    isLecturer:{
        type: Boolean,
        default: false,
    
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
    availableTimes: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
});

const userModel = mongoose.model('Users', userShema);

module.exports = userModel;