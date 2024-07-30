const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js');
const lecturer = require('../Models/lecModel.js');
const Department = require('../Models/DeptModel.js')
const Booking = require('../Models/appointmentModel.js')
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const moment = require('moment');

userRouter.post('/register', async (req, res) => {

    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
        console.warn(error);
        res.status(500).send({ message: "Error creating user", success: false });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(200).send({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid credentials", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).send({ message: "Login successful", success: true, data: token, user: {userId: user._id, username: user.username, isAdmin: user.isAdmin, email: user.email } });

        }
    } catch (error) {
        console.warn("error is: ", error);
        res.status(500).send({ message: "Error logging in", success: false });
    }
});



userRouter.post("/get-user-info-by-id", async (req, res) => {
    let userId
    try {
        const token = req.body.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                return res.status(401).send({ message: "Unauthorized", success: false })
            } else {
                userId = decoded.id;
            }

        });


        // Declare and initialize user before using it
        const user = await getUserInfoById(userId);
        res.status(200).json({ user });
    } catch (error) {
        console.warn("Error is:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

const getUserInfoById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        console.warn("Error is:", error.message);
        return null;
    }

}

userRouter.get('/get-all-department', async (req, res) => {


    try {

        const department = await Department.find();
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching department', error: error.message });
    }
});

userRouter.get('/get-all-lecturers', async (req, res) => {

    try {

        const lecturers = await lecturer.find();
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lecturers', error: error.message });
    }
});

userRouter.get('/get-lecturer-by-department', async (req, res) => {
    const department = req.query.department; // Use req.query to get the query parameter

    try {
        const lecturers = await lecturer.find({ department });
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lecturers', error: error.message });
    }
});



userRouter.post('/book-appointment', async (req, res) => {
    const { date, time, name, email, userId, lecturerId } = req.body;
    try {
        // req.body.date = moment(req.body.date, 'YYYY-MM-DD').toISOString();
        // req.body.time = moment(req.body.time, 'HH:mm').toISOString('HH:mm');

        // Check if an appointment already exists for the given date, time, and lecturer
        const existingAppointment = await Booking.findOne({ date, time, userId, lecturerId });
        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked.' });
        }

        const appointment = await Booking.findOne({ date, time, userId, lecturerId});
        const newBooking = new Booking({
            ...req.body,
            userId,
            lecturerId,
            date,
            time,
            name,
            email
        });


        await newBooking.save();



        //send notification to lecturer

        const lecturerUser = await lecturer.findById(lecturerId);
        const unseenNotifications = lecturerUser.unseenNotifications;

        unseenNotifications.push({
            type: "New Booking",
            message: "New Appointment Booking",
            data: {
                name: req.body.name,
                email: req.body.email,
                reason: req.body.reason,
                date: req.body.date,
                time: req.body.time
            },
            onclick: '/booked-appointments'
        });
        console.log(lecturerUser._id);
        await lecturer.findByIdAndUpdate(lecturerUser._id, { unseenNotifications });
    } catch (error) {
        console.warn("Error is:", error.message);

    }
});


userRouter.post('/profile', authMiddleware, async (req, res) => {
    // The ID of the logged-in user

    // Determine user type and fetch profile information accordingly
    // let user;
    // const isAdmin = req.user.isAdmin;
    // const isLecturer = req.user.isLecturer;

    try {

        const user = await User.findById(req.user._id).select('username', 'email');


        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }

        res.status(200).send({ message: "Profile fetched successfully", success: true, user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).send({ message: "Error fetching profile", success: false });
    }

});

userRouter.get('/appointments', async (req, res) => {
    try {
      const userId = req.query.userId;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Find all appointments for the user
      const appointments = await Booking.find({ userId }).populate('lecturerId'); // Use .populate() if you need to populate related data
  
      if (!appointments) {
        return res.status(404).json({ message: 'No appointments found' });
      }
  
      res.status(200).json({ appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



module.exports = userRouter;
