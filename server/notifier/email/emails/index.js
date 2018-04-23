const { logger } = require('../../../logging');
const transporter = require('../index');
const { errorMessage } = require('./error');
const activateMessage = require('./activateAccount');

const logEmail = (data) => {
  logger.info('--- email sent ---', data);
};

const sendError = (title, message) => {
  const messageObj = errorMessage({ title, message, receiver: 'admin@torrent.report' });
  return transporter.sendMail(messageObj).then(logEmail);
};

const sendActivationLink = (token, email) => {
  const messageObj = activateMessage(token, email);
  return transporter.sendMail(messageObj);
};

// const sendMessage = messageFunc => (title, message) => {
//   const messageObj = messageFunc(title, message);
// };

module.exports = { sendError, sendActivationLink };
