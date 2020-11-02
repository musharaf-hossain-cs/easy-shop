const socketIO = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const select = require('./src/querys/select/select');

io.on('connection', socket => {
    console.log('User Connected!');

    socket.on('sendCustomers',async ()=>{
        const customers = await select.getCustomer();
        socket.emit('getCustomers',customers);
    });
    socket.on('disconnect',()=>{
        console.log('User Disconnected!');
    });
    socket.on('device',(data)=>{
        console.log(data);
    });
});

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
