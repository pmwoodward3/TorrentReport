module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`## Socket Connection User ## + ${
      socket.id
    } \t (A socket connection to the server has been made)`);
    // console.log(socket);

    socket.on('disconnect', () => {
      console.log(`## Socket Connection User## - ${socket.id} \t (has left the building)`);
    });
  });
};
