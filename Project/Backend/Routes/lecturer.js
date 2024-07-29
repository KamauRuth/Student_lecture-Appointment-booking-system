const express = require('express');
const lecturerRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js');
const Lecturer = require('../Models/lecModel.js');
const Department = require('../Models/DeptModel.js')

const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { default: mongoose } = require('mongoose');



lecturerRouter.post('/update-availability', async (req, res) => {
    try {
        const { _id, newAvailability } = req.body;

        // Update the lecturer's availability
        const lecturer = await Lecturer.findByIdAndUpdate(
            _id,
            { newAvailability },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );
        
        if (lecturer) {
            console.log(lecturer);
            res.status(200).send({ message: "Availability updated successfully", success: true });
        } else {
            res.status(400).send({ message: "Lecturer not found", success: false });
        }
    } catch (error) {
        console.error("Error updating availability:", error);
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

lecturerRouter.post('/profile', authMiddleware, async (req, res) => {


    try {

        const lecturer = await Lecturer.findById(req.user._id).select('username', 'email');


        if (!lecturer) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        res.status(200).send({ message: "Profile fetched successfully", success: true, user: { username: lecturer.username, email: lecturer.email } });
    } catch (error) {
        res.status(500).send({ message: "Error fetching profile", success: false });
    }

});



module.exports = lecturerRouter;