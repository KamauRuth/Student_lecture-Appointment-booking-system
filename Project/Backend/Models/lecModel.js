const mongoose = require('mongoose');
const lecSchema = new mongoose.Schema({
    userId:{
        type: String,
        default: false
    },
    firstname: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    lastname: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    department: {
        type: String,
        required: [true, 'Please tell us your department!']
    },
    username: {
        type: String,
        default: false
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!']
    },
    phoneNumber: {
        type: String,
        default: false
    },
    address: {
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
    experience: {
        type: String,
        default: false
    },
    timings: {
        type: Array,
     
    },
    status: {
        type: String,
        default: 'pending'
    }
 
}, {
    timestamps: true
});

const lecModel = mongoose.model('Lecturers', lecSchema);
module.exports = lecModel;
