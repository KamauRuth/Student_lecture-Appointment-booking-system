const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/userModels.js');
const lecturer = require('../Models/lecModel.js');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");// Ensure the correct path to your User model


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
       
        const newUser = new User(user);
        await newUser.save();
        res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
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
        } else{
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.status(200).send({ message: "Login successful", success: true, data: token, user: { username: user.username, role: user.role }});
        
        }
    } catch (error) {
        console.log("error is: ",error);
        res.status(500).send({ message: "Error logging in", success: false });
    }
});

userRouter.post("/get-user-info-by-id", async (req, res) => {
    let userId
    try {
        const token = req.body.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
    
            if (err)
                {
                    return res.status(401).send({message: "Unauthorized", success: false})
                }else{
                  userId = decoded.id;
                }
    
    })


      console.log("Request received with userId:", userId);
      // Declare and initialize user before using it
      const user = await getUserInfoById(userId);
      console.log("User information retrieved:", user);
      res.status(200).json({ user });
    } catch (error) {
      console.log("Error is:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
    const getUserInfoById = async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log("Error is:", error.message);
      return null;
    }

}

userRouter.post('/apply-lecturer', async (req, res) => {
    try{
        const newlecturer = new lecturer({...req.body , status : 'pending'} );
        await newlecturer.save();
        const adminUser = await User.findOne({isAdmin: true});
        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: "New lecturer application",
            message: "New lecturer application",
            data:{
                userId: newLecturer.userId,
                username: newLecturer.username,
                email: newLecturer.email
            },
            onclick : '/admin/lecturer-applications'
        });
        await User.findByIdAndupdateOne(adminUser._id, {unseenNotifications});
    } catch (error) {
        console.log("Error is:", error.message);
        res.status(500).json({ message: "Server Error" });
    }

}
  
);

module.exports = userRouter;
