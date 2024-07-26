// reminderScheduler.js
const cron = require('node-cron');
const moment = require('moment');
const Appointment = require('./models/Appointment'); // Update with the correct path to your Appointment model
const sendEmail = require('./sendEmail'); // Update with the correct path to your sendEmail function

// Function to check for upcoming appointments and send reminders
const checkAppointments = async () => {
  const now = moment();
  const reminderTime = now.add(1, 'hours').toDate(); // Remind 1 hour before the appointment

  try {
    // Find appointments scheduled within the next hour
    const upcomingAppointments = await Appointment.find({
      date: { $lte: reminderTime },
      reminderSent: false
    });

    // Send reminder emails
    for (const appointment of upcomingAppointments) {
      await sendEmail(appointment.studentEmail, 'Appointment Reminder', `You have an appointment with ${appointment.lecturerName} at ${moment(appointment.date).format('LLL')}`);
      await sendEmail(appointment.lecturerEmail, 'Appointment Reminder', `You have an appointment with ${appointment.studentName} at ${moment(appointment.date).format('LLL')}`);

      // Update appointment to mark reminder as sent
      appointment.reminderSent = true;
      await appointment.save();
    }
  } catch (error) {
    console.error('Error checking appointments:', error);
  }
};

// Schedule the task to run every 10 minutes
cron.schedule('*/10 * * * *', checkAppointments);

module.exports = checkAppointments;
