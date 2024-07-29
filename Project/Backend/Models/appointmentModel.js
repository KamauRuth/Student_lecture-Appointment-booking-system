const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

  
  userInfo: {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
