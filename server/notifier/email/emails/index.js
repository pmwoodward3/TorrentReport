const { logger } = require('../../../logging');
const transporter = require('../index');
const { errorMessage } = require('./error');

const logEmail = (data) => {
  logger.info('--- email sent ---', data);
};

const sendError = (title, message) => {
  const messageObj = errorMessage({ title, message, receiver: 'admin@torrent.report' });
  return transporter.sendMail(messageObj).then(logEmail);
};

module.exports = { sendError };
