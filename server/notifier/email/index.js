const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const SECRETS_PATH = path.resolve(__dirname, '../../../secrets.js');

let cred;

if (fs.existsSync(SECRETS_PATH)) {
  cred = require(SECRETS_PATH).email;
} else if (
  !process.env.EMAIL_HOST ||
  !process.env.EMAIL_PORT ||
  !process.env.EMAIL_SEC ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS
) {
  throw 'Missing Email Config Details';
} else {
  cred = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SEC == 'true', // use TLS
    auth: {
      type: 'login',
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
}

const transporter = nodemailer.createTransport(cred);

// verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('## Email Service Status ## - FAIL!');
    console.log(error);
  } else {
    console.log('## Email Service Status ## + Running!');
    // console.log(success);
  }
});

module.exports = transporter;
