const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_DRIVER,
  host: process.env.MAIL_HOST,
  port: 465,
  secure: process.env.MAIL_ENCRYPTION, // Use TLS if MAIL_ENCRYPTION is set to 'tls'
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});


module.exports = transporter;