const express = require('express');
const userRouter = express.Router();

const { Register, Login} = require('../Controllers/userController.js');

userRouter.post('/register', Register);
userRouter.post('/login', Login);


module.exports = userRouter;