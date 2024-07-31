const express = require('express');
const adminRouter = express.Router();
const Lecturer = require("../Models/lecModel")
const User = require('../Models/userModels')
const Department = require('../Models/DeptModel')
const Appointment = require('../Models/appointmentModel')
const authMiddleware = require("../middlewares/authMiddleware")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { Parser } = require('json2csv');


adminRouter.get("/get-all-lecturers", (req, res, next) => authMiddleware(req, res, next), async (req, res) => {
    try {
        const lecturers = await Lecturer.find({});
        res.status(200).json({ lecturers: lecturers })
    }
    catch (error) {
        console.log("Failed ro get lectureses", error)
        return res.status(500).json({ message: "Internal server error" })
    }
});

adminRouter.post("/register-lecturers", async (req, res) => {
    console.log(req.body);

    try {
        const userExists = await Lecturer.findOne({ email: req.body.email });
        console.log(userExists);
        if (userExists) {
            return res.status(400).send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newLecturer = new Lecturer(req.body);
        await newLecturer.save();
        res.status(200).send({ message: "Lecturer Registered  successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Registering", success: false });
    }
});

adminRouter.post('/lecturer-login', async (req, res) => {

    console.log(req.body);

    try {
        const user = await Lecturer.findOne({ username: req.body.username });
        if (!user) {
            return res.status(200).send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid credentials", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).send({ message: "Login successful", success: true, data: token, user: { username: user.username, isLecturer: user.isLecturer, userId: user._id, email: user.email } });

        }
    } catch (error) {
        console.log("error is: ", error);
        res.status(500).send({ message: "Error logging in", success: false });
    }
});

adminRouter.post("/notifications", async (req, res) => {
    try {
        const { username, isLecturer } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        let notifications;

        if (isLecturer) {  // If the user is a lecturer
            notifications = await Lecturer.findOne({ username });
        } else {  // If the user is a student
            notifications = await User.findOne({ username });
        }

        if (!notifications) {
            return res.status(404).json({ message: 'No notifications found for this user' });
        }

        res.status(200).json({ message: 'Notifications retrieved successfully', notifications });
    } catch (error) {
        console.error('An error occurred getting notifications:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

adminRouter.post('/add-department', async (req, res) => {
    const { department } = req.body
    try {
        const departmentExists = await Department.findOne({ department: req.body.department });
        console.log(departmentExists);
        if (departmentExists) {
            return res.status(400).send({ message: "Department already exists", success: false });
        }



        const newDepartment = new Department({
            department: department,
        });
        await newDepartment.save();


        res.status(201).json({ message: 'Department added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding department', error: error.message });
    }
});

// Fetch appointments for the logged-in lecturer
adminRouter.get('/booked-appointments', async (req, res) => {
    const { userId } = req.query;


    if (!userId) {
        return res.status(400).json({ message: 'Bad Request: Missing userId' });
    }

    try {
        // Fetch the lecturer from the database
        const lecturer = await Lecturer.findById(userId);
        if (!lecturer || !lecturer.isLecturer) {
            return res.status(403).json({ message: 'Forbidden: User is not a lecturer' });
        }

        // Fetch appointments for this lecturer
        const appointments = await Appointment.find({ lecturerId: userId }).populate('lecturerId');

        res.json({ appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// Accept Appointment and Notify User
adminRouter.post('/appointments/:id/accept', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
        if (appointment) {
            // Find the user associated with this appointment
            const user = await User.findById(appointment.userId);

            const lecturer = await Lecturer.findById(appointment.lecturerId);
            if (user) {
                // Add notification to the user
                user.unseenNotifications.push({
                    type: 'Appointment Accepted',
                    message: `Your appointment with ${lecturer.username} has been accepted.`,
                    data: {
                        appointmentId: appointment._id,
                        date: appointment.date,
                        time: appointment.time,
                        department: appointment.department,
                        name: lecturer.username,
                        email: lecturer.email,
                    },
                    onclick: '/user/appointments' // Redirect user to their appointments page
                });

                await user.save();
            }

            res.json({ message: 'Appointment accepted and user notified.' });
        } else {
            res.status(404).json({ message: 'Appointment not found.' });
        }
    } catch (error) {
        console.error('Error accepting appointment:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

adminRouter.get('/report/csv', async (req, res) => {
    try {
        // Aggregation pipeline to fetch the required fields
        const pipeline = [
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    username: 1,
                    email: 1,
                    department: 1,
                    reason: 1,
                }
            }
        ];

        // Execute the aggregation
        const results = await Appointment.aggregate(pipeline);

        // Check if results are as expected
        if (!results || results.length === 0) {
            console.log("No results found");
        } else {
            console.log("Results found");
        }

        // Define the fields for the CSV file
        const fields = ['email', 'username', 'department', 'reason'];
        const json2csvParser = new Parser({ fields });

        const csv = json2csvParser.parse(results);

        // Set headers and send the CSV file
        res.header('Content-Type', 'text/csv');
        res.attachment('report.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).send('Error generating CSV report');
    }
});


// Reject Appointment and Notify User
adminRouter.post('/appointments/:id/reject', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
        if (appointment) {
            // Find the user associated with this appointment
            const user = await User.findById(appointment.userId);
            if (user) {
                // Add notification to the user
                user.unseenNotifications.push({
                    type: 'Appointment Rejected',
                    message: `Your appointment with ${appointment.lecturerId} has been rejected.`,
                    data: {
                        appointmentId: appointment._id,
                        date: appointment.date,
                        time: appointment.time,
                        department: appointment.department,
                    },
                    onclick: '/user/appointments' // Redirect user to their appointments page
                });

                await user.save();
            }

            res.json({ message: 'Appointment rejected and user notified.' });
        } else {
            res.status(404).json({ message: 'Appointment not found.' });
        }
    } catch (error) {
        console.error('Error rejecting appointment:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});



adminRouter.put('/lecturers/:id/available-times', async (req, res) => {
    const { availableTimes } = req.body;
    await Lecturer.findByIdAndUpdate(req.params.id, { availableTimes });
    res.json({ message: 'Available times updated' });
});


adminRouter.post('/mark-all-as-seen', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = await Lecturer.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        console.log("Starting aggregation...");


        user.seenNotifications = user.seenNotifications.concat(user.unseenNotifications);
        user.unseenNotifications = []; // Clear unseen notifications

        await user.save();

        res.status(200).json({ message: 'All notifications marked as seen' });
    } catch (error) {
        console.error('Error marking notifications as seen:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = adminRouter;