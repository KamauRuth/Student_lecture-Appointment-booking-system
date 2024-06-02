/* const express = require('express');
const router = express.Router();
const User = require('../Models/userModels.js');
const bcrypt = require('bcryptjs');
const userRouter = require('../Routes/user.js');
//const { default: Register } = require('../client/src/pages/register.js');
//const { default: Login } = require('../client/src/pages/login.js');

async function Register(req, res)  {
    console.log ("wakamaauuuu");
    try{
        const UserExist = await User.findOne ({email: req.body.email});
        if(UserExist) return res.status(400).json({
            status: 'fail',
            message: 'User already exist'
        });
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        await newUser.save()
        res.status(200).json({
            status: 'success',
            message: 'User signed up successfully'
        });
    } catch(err){
       res.status(400).json({
           status: 'fail',
           message: err
        });
    }
}

async function Login (req, res)  {
    try{
        res.status(200).json({
            status: 'success',
            message: 'User signed up successfully'
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}


module.exports = {Register, Login}; */