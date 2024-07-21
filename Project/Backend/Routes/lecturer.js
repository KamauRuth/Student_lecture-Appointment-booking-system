const express = require('express');
const lecturerRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js');
const Lecturer = require('../Models/lecModel.js');
const Department = require('../Models/DeptModel.js')

const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");



lecturerRouter.post('/update-availability', async (req, res) => {
    const { lecturerId, availableDays } = req.body;

    try {
        // Find the lecturer by _id (ObjectId)
        const lecturer = await Lecturer.findById(lecturerId);
        console.log(lecturer);

        if (lecturer) {
            // Update the availableDays field
            lecturer.availableDays = availableDays;
            await lecturer.save();
            res.status(200).send({ message: "Availability updated successfully", success: true });
        } else {
            res.status(400).send({ message: "Lecturer not found", success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating availability", success: false });
    }
});




lecturerRouter.post('/get-lecturer-by-department', async (req, res) => {
    try {
        const lecturers = await Lecturer.find({ department: req.body.department });
        const lecturerId = lecturers.map(lecturer => lecturer._id);
        const availabilities = await Lecturer.find({ lecturerId: lecturerId });

        const lecturersWithAvailability = lecturers.map(lecturer => {
            const availability = Lecturer.find(a => a.lecturerId.equals(lecturer._id));
            return {
                ...lecturer._doc,
                availableDays: availability ? availability.availableDays : [],
                
            };
        });

        res.status(200).send({ success: true, data: lecturersWithAvailability });
    } catch (error) {
        res.status(500).send({ message: "Error fetching lecturers", success: false });
    }
});



module.exports = lecturerRouter;