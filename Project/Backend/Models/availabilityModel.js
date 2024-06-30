const mongoose = require ('mongoose');
const availabilitySchema = new mongoose.Schema({
    lecturerId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Lecturer', required: true 
        },
    availableDay:{
      type: String,
      required: true
    },
    availableTime: {
        type: String,
        required: true,
    }
  });

  const availabilityModel= mongoose.model ('Availability', availabilitySchema)
  module.exports = availabilityModel;