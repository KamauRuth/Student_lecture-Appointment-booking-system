const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  lecturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   // required: true
  },
  username: {
      type: String,
      required: true
    },
  email: {
      type: String,
      required: true
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
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
