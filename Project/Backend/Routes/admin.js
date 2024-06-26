const express = require('express');
const adminRouter = express.Router();
const Lecturer = require ("../Models/lecModel")
const User = require ('../Models/userModels')
const authMiddleware = require ("../middlewares/authMiddleware")

adminRouter.get("/get-all-lecturers", (req,res, next) => authMiddleware(req,res, next), async(req,res)=>{
    try{
        const lecturers = await Lecturer.find({});
        res.status(200).json({lecturers: lecturers})
    }
    catch(error){
        console.log("Failed ro get lectureses", error)
        return res.status(500).json({message: "Internal server error"})
    }
});

adminRouter.post("/approve-lecturer",  async(req,res) => {
    try {
        const lecturer = await Lecturer.findByIdAndUpdate(req.body.user_id, {status: "approved"}, {new: true});
        
        if (!lecturer) {
            return res.status(400).json({ message: "Lecturer not found" });
        }

        res.status(200).json({ message: "Lecturer approved successfully", lecturer: lecturer });
    } catch (error) {
        
    }
});

adminRouter.post("/notifications",  async(req,res) => {
    try {
        const notifications = await User.findOne({username: req.body.username});
        console.log(notifications);
        
        if (!notifications) {
            return res.status(400).json({ message: "No Notification" });
        }

        res.status(200).json({ message: "New Notification",notifications: notifications});
    } catch (error) {
      console.log("an error occurred getting notifications", error);
      return res.status(500).json({message:"Internal Server error"})  
    }
});

adminRouter.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
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