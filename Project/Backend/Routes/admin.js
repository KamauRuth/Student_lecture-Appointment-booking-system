const express = require('express');
const adminRouter = express.Router();
const Lecturer = require("../Models/lecModel")
const User = require('../Models/userModels')
const Department = require('../Models/DeptModel')
const authMiddleware = require("../middlewares/authMiddleware")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


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
        const user = await  Lecturer.findOne({ username: req.body.username });
        if (!user) {
            return res.status(200).send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid credentials", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).send({ message: "Login successful", success: true, data: token, user: { username: user.username, isLecturer: user.isLecturer, userId: user._id, email: user.email} });

        }
    } catch (error) {
        console.log("error is: ", error);
        res.status(500).send({ message: "Error logging in", success: false });
    }
});

adminRouter.post("/notifications", async (req, res) => {
    try {
        const notifications = await User.findOne({ username: req.body.username });
        console.log(notifications);

        if (!notifications) {
            return res.status(400).json({ message: "No Notification" });
        }

        res.status(200).json({ message: "New Notification", notifications: notifications });
    } catch (error) {
        console.log("an error occurred getting notifications", error);
        return res.status(500).json({ message: "Internal Server error" })
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




adminRouter.post('/appointments/:id/accept', async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'Accepted' });
    res.json({ message: 'Appointment accepted' });
});


adminRouter.post('/appointments/:id/reject', async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
    res.json({ message: 'Appointment rejected' });
});


adminRouter.put('/lecturers/:id/available-times', async (req, res) => {
    const { availableTimes } = req.body;
    await Lecturer.findByIdAndUpdate(req.params.id, { availableTimes });
    res.json({ message: 'Available times updated' });
});

module.exports = adminRouter;