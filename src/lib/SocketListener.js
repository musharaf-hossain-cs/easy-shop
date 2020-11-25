const socketIO = require('socket.io');

const select = require('../querys/select/select');
const check = require('../querys/select/check');
const insert  = require('../querys/insert/insert');
const login = require('../querys/select/login');
const product = require('../querys/select/products');
const update = require('../querys/update/update');

function setServer(server){
    const io = socketIO(server);
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
                let res = await insert.Insert(data);
                console.log(res);
                if(data.tablename.toLowerCase()==='product_models'){
                    socket.emit('insertProductRes',res);
                }
                else if(data.tablename.toLowerCase()==='customers'){
                    socket.emit('insertCustomerRes',res);
                }
            }catch (e){
                console.log(e);
            }
        });
        socket.on('login', async (data) => {
            let res = await login.login(data);
            socket.emit('loginInfo', res);
        });
        socket.on('sendProductsAdmin', async () => {
            let res = await product.getProducts();
            socket.emit('getProductsAdmin', res);

        });
        socket.on('sendProductAdmin', async (input) => {
            let res = await product.getProduct(input.id);
            socket.emit('getProductAdmin', res);

        });
        socket.on('update', async (input) => {
            let res = await update.update(input);
            socket.emit('updateResponse',res);
        });

    });
}

module.exports = {
    setServer
}
