// Importing the express module
const express = require('express');
// Creating an express application
const app = express();
// Importing the http module
const http = require('http');
// Creating an http server
const server = http.createServer(app);
// Importing the socket.io module
const {Server} = require('socket.io');
// Creating a new instance of socket.io
const io = new Server(
	server,
	{cors: {
		origin:"*"
	}})

// Middleware to handle the username
io.use((socket, next)=>{
	const userName = socket.handshake.auth.userName
	if(!userName){
		return next(new Error('missing username'))
	}
	socket.userName = userName
	next()
})

// Array to store all connected users
const connectedUsers = []

// Handling the connection event
io.on('connection', (socket) => {
  const userIndex = connectedUsers.findIndex((user) => user.userName === socket.userName);
  if (userIndex === -1) {
    connectedUsers.push({
      userName: socket.userName,
      userId: socket.id
    });

    // Emit to all users except the one connecting
    socket.broadcast.emit('user connected', {
      userId: socket.id,
      userName: socket.userName
    });

    // Emit to the connecting user
    socket.emit('users', connectedUsers);
  }

  socket.on('disconnect', () => {
    const disconnectIndex = connectedUsers.findIndex((user) => user.userName === socket.userName);
    if (disconnectIndex !== -1) {
      connectedUsers.splice(disconnectIndex, 1);
      socket.broadcast.emit('users', connectedUsers);
    }
  });
});



// importing port number from .env
require("dotenv").config()
const PORT = process.env.PORT || 4545
// Listening on the port
server.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`)
})