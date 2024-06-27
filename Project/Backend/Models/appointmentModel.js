const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    studentName:{
      type: String,
      reqiired: true
    },
    lecturerName: String,
    timeSlot: String,
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  });


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;