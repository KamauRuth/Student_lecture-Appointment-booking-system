const express = require('express');
const lecturerRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js');
const Lecturer = require('../Models/lecModel.js');
const Department = require('../Models/DeptModel.js')
const Availability = require('../Models/availabilityModel.js')
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");


lecturerRouter.post('/update-availability', async (req, res) => {
    const lecturer = req.lecturerId;
  
    const { lecturerId } = Lecturer.findById;
    const { availableDays, availableTimes } = req.body;
    //const lecturer = await Lecturer.findById(lecturerId);

  
    console.log(lecturerId, availableDays, availableTimes);
    
    try {
        const availability = await Availability.findOne({ lecturerId });
        if (availability) {
            availability.availableDays = availableDays;
            availability.availableTimes = availableTimes;
        } else {
            const token = jwt.sign({ id: lecturerId }, process.env.JWT_SECRET, { expiresIn: "1d" });
            const updatedAvailability = new Availability( req.body );
            await updatedAvailability.save();
            res.status(200).send({ message: "Availability updated successfully", success: true , data: token});
    }
    }
    catch (error) {

        console.log(error);

        res.status(500).send({ message: "Error updating availability", success: false });
    }
});

lecturerRouter.post('/get-lecturer-by-department', async (req, res) => {
    try {
        const lecturers = await Lecturer.find({ department: req.body.department });
        const lecturerId = lecturers.map(lecturer => lecturer._id);
        const availabilities = await Availability.find({ lecturerId: lecturerId });

        const lecturersWithAvailability = lecturers.map(lecturer => {
            const availability = Availabilities.find(a => a.lecturerId.equals(lecturer._id));
            return {
                ...lecturer._doc,
                availableDays: availability ? availability.availableDays : [],
                availableTimes: availability ? availability.availableTimes : [],
            };
        });

        res.status(200).send({ success: true, data: lecturersWithAvailability });
    } catch (error) {
        res.status(500).send({ message: "Error fetching lecturers", success: false });
    }
});



module.exports = lecturerRouter;