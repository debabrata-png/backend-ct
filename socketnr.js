// socket.js
let ioInstance = null;

module.exports = {
  init: (server) => {
    const { Server } = require('socket.io');
    ioInstance = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    ioInstance.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    return ioInstance;
  },

  getIO: () => {
    if (!ioInstance) {
      throw new Error('Socket.io not initialized!');
    }
    return ioInstance;
  }
};
