const socketio = require("socket.io")
module.exports = server => {
    const io = socketio(server, {
        cors: {
          origin: "*"
        }
      })
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });

        socket.on('joinRoom',(room) => {
            socket.join(room)
            console.log("User joined room")
        })

        socket.on('message_server',(room) => {
            io.to(room).emit('message')
        })
    });
}