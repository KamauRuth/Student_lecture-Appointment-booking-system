const express = require('express');
const lecturerRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js');
const Lecturer = require('../Models/lecModel.js');
const Department = require('../Models/DeptModel.js')
const availability = require ('../Models/availabilityModel.js')
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");// Ensure the correct path to your User model

lecturerRouter.post('/update-availability', async (req, res) => {
    const { lecturerId, availableDays, availableTimes } = req.body;
    try {
        let availability = await availability.findOne({ lecturerId });
        if (availability) {
            availability.availableDays = availableDays;
            availability.availableTimes = availableTimes;
        } else {
            availability = new availability({ lecturerId, availableDays, availableTimes });
        }
        await availability.save();
        res.status(200).send({ message: "Availability updated successfully", success: true });
    } catch (error) {
        res.status(500).send({ message: "Error updating availability", success: false });
    }
});

lecturerRouter.post('/get-lecturer-by-department', async (req, res) => {
    try {
        const lecturers = await Lecturer.find({ department: req.body.department });
        const lecturerIds = lecturers.map(lecturer => lecturer._id);
        const availabilities = await availability.find({ lecturerId: { $in: lecturerIds } });
        
        const lecturersWithAvailability = lecturers.map(lecturer => {
            const availability = availabilities.find(a => a.lecturerId.equals(lecturer._id));
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