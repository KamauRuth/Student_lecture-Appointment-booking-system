const express = require('express');
const adminRouter = express.Router();
const Lecturer = require ("../Models/lecModel")
const authMiddleware = require ("../middlewares/authMiddleware")

adminRouter.get("/get-all-doctors", authMiddleware, async(req,res)=>{
    try{
        const lecturers = await Lecturer.find([]);
        res.status(200).send
    }
})