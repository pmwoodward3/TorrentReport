const { logger } = require('../logging');

module.exports = (io) => {
  io.on('connection', (socket) => {
    const main = io.of('/');
    logger.info(`## Socket Connection User ## socket-id: ${
      socket.id
    } \t (A socket connection to the server has been made)`);
    io.of('/').emit('data', { userCount: Object.keys(main.connected).length });

    socket.on('disconnect', () => {
      io.of('/').emit('data', { userCount: Object.keys(main.connected).length });
      logger.info(`## Socket Connection User## - ${socket.id} \t (has left the building)`);
    });
  });
};
