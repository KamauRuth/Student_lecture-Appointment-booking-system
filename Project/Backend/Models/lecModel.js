const mongoose = require('mongoose');
const lecSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: [true, 'Please provide a userId!']
    },
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
    isLecturer: {
        type: String,
        default: false
    },
    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
    courses: {
        type: Array,
        default: []
    },
    fromtime: {
        type: String,
         required: [true, 'Please provide a fromtime!']
    },
    totime: {
        type: String,
         required: [true, 'Please provide a totime!']
    },
}, {
    timestamps: true
});

const lecModel = mongoose.model('Lecturers', lecSchema);
module.exports = lecModel;
