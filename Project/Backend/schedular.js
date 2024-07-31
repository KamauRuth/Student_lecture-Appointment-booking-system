const cron = require('node-cron');
const transporter = require('./mailer');
const Lecturer = require('../Models/lecModel.js'); 
const Appointment = require('../Models/appointmentModel.js');
const User = require('../Models/userModels.js'); 

// Schedule a job every hour to check for appointments 24 hours away
cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const appointments = await Appointment.find({
      date: { $gte: tomorrow, $lt: new Date(tomorrow.getTime() + 60 * 60 * 1000) }
    });

    appointments.forEach(async (appointment) => {
      const user = await User.findById(appointment.userId);
      const lecturer = await Lecturer.findById(appointment.lecturerId);

      // Send reminder email
      const mailOptions = {
        from: 'rkamau573@gmail.com',
        to: `${user.email}, ${lecturer.email}`,
        subject: 'Appointment Reminder',
        text: `Reminder: You have an appointment scheduled for tomorrow.
        - Date: ${appointment.date}
        - Time: ${appointment.time}
        - With: ${lecturer.firstname} ${lecturer.lastname}
        - Reason: ${appointment.reason || 'No reason provided'}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending reminder email:', error);
        } else {
          console.log('Reminder email sent:', info.response);
        }
      });
    });
  } catch (error) {
    console.error('Error sending reminder emails:', error);
  }
});

