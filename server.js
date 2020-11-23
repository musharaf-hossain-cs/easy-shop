const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const socketListener = require('./src/lib/SocketListener');
socketListener.setServer(server);

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
