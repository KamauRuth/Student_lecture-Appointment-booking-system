// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rkamau573@gmail.com',
    pass: '*HappyBit001.'
  }
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendMail };
