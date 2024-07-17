const mongoose = require ('mongoose');
const availabilitySchema = new mongoose.Schema({
  lecturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecturer',
    required: true
  },
    availableDays:{
      type: [],
      required: true
    },
    availableTimes: {
        type: [],
        required: true,
    }
  });

  const availabilityModel= mongoose.model ('Availability', availabilitySchema)
  module.exports = availabilityModel;