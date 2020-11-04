const socketIO = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const select = require('./src/querys/select/select');
const check = require('./src/querys/select/check');
const insert  = require('./src/querys/insert/insert');

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
    socket.on('check',async (data)=>{
        let result = await check.check(data);
        console.log(result.length);
        let found = result.length === 0;
        socket.emit(data.command, found);
    });
    socket.on('insert', async (data)=>{
        try{
            await insert.Insert(data);
        }catch (e){
            console.log(e);
        }
    });
});

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
