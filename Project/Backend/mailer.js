// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rkamau573@gmail.com',
    pass: 'vfkiaqhwhfljmyme'
  }
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'rkamau573@gmail.com',
    to: 'mwendwae054@gmail.com',
    subject,
    text: "Hello world"
  };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
};

module.exports = { sendMail, transporter };
