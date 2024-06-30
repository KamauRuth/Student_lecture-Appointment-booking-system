const mongoose = require('mongoose');
const lecSchema = new mongoose.Schema({
    lecturerId:{
        type: String,
        default: true
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
        required: [true, 'Please provide a username!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!']
    },
    isLecturer: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!']
    },
    
    phoneNumber: {
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
    availableDays: {
        type: Array,
        default: [] 
    },
    availableTime: {
        type: Array,
        default: []
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
