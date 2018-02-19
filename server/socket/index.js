module.exports = (io) => {
  io.on('connection', (socket) => {
    const main = io.of('/');
    console.log(`## Socket Connection User ## + ${
      socket.id
    } \t (A socket connection to the server has been made)`);
    io.of('/').emit('data', { userCount: Object.keys(main.connected).length });
    console.log(Object.keys(main.connected).length);
    // console.log(Object.keys(main.connected).map((key) => {
    //   const obj = main.connected[key];
    //   return obj.client.conn.request;
    // }));

    socket.on('disconnect', () => {
      io.of('/').emit('data', { userCount: Object.keys(main.connected).length });
      console.log(`## Socket Connection User## - ${socket.id} \t (has left the building)`);
    });
  });
};
