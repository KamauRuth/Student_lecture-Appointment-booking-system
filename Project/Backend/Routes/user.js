const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js'); // Ensure the correct path to your User model

userRouter.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        console.log("req email: ",req.body.email)
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send({ message: "User already exists", success: false });
        }
        const password = req.body.password;
        console.log("password: ",password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
        res.status(500).send({ message: "Error creating user", success: false });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials", success: false });
        }
        res.status(200).send({ message: "Logged in successfully", success: true });
    } catch (error) {
        res.status(500).send({ message: "Error logging in", success: false });
    }
});

module.exports = userRouter;
