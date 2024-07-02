const mongoose = require('mongoose');
const lecSchema = new mongoose.Schema({
   
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
 
}, {
    timestamps: true
});

const lecModel = mongoose.model('Lecturers', lecSchema);
module.exports = lecModel;
