// sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password' // Your email password
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Your email
      to,
      subject,
      text
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
