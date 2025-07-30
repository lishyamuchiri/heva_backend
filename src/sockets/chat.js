module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('joinRoom', ({ room, user }) => {
      socket.join(room);
      io.to(room).emit('message', { user: 'System', text: `${user.name} joined ${room}`, timestamp: new Date() });
    });
    socket.on('chatMessage', async ({ room, message, user, language }) => {
      const msg = { room, user: user.id, text: message, language, timestamp: new Date() };
      io.to(room).emit('message', { user: user.name, text: message, timestamp: msg.timestamp });
      // Save message to MongoDB (optional)
      // const newMessage = new Message(msg);
      // await newMessage.save();
    });
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
