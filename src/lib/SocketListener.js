const socketIO = require('socket.io');

const select = require('../querys/select/select');
const check = require('../querys/select/check');
const insert  = require('../querys/insert/insert');
const update = require('../querys/update/update');

const login = require('../querys/select/login');
const product = require('../querys/select/products');
const employee = require('../querys/select/employee');
const requestProcessor = require('../querys/update/requestProcess');
const report = require('../querys/select/report');
const persons = require('../querys/select/persons');
const changePassword = require('../querys/update/changePassword');
const users = require('./users');
const carts = require('../querys/select/carts');
const payment = require('../querys/insert/payment');
const takeOrder = require('../querys/insert/takeOrder');
const updateOrder = require('../querys/update/updateOrder');


function setServer(server){
    const io = socketIO(server);
    io.on('connection', socket => {
        console.log('User Connected!');

        socket.on('disconnect',()=>{
            console.log('User Disconnected!');
        });
        socket.on('device',(data)=>{
            console.log(data);
        });
        socket.on('check',async (data)=>{
            let result = await check.check(data);
            console.log(result.length);
            let notFound = result.length === 0;
            socket.emit(data.command, notFound);
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
                else if(data.tablename.toLowerCase()==='notices'){
                    socket.emit('insertNoticeRes',res);
                }
                else if(data.tablename.toLowerCase()==='employees'){
                    socket.emit('insertEmployeeRes',res);
                }else if(data.tablename.toLowerCase()==='payments'){
                    socket.emit('paymentInfo',res);
                }
            }catch (e){
                console.log(e);
            }
        });
        socket.on('login', async (data) => {
            let res = await login.login(data);
            socket.emit('loginInfo', res);
        });
        socket.on('signout', async (data) => {
            users.removeUser(data.token);
        });
        socket.on('sendProducts', async () => {
            let res = await product.getProducts();
            socket.emit('getProducts', res);

        });
        socket.on('sendProduct', async (input) => {
            let res = await product.getProduct(input.id);
            socket.emit('getProduct', res);

        });
        socket.on('sendTheseProducts', async (input) => {
            let res = await product.getTheseProducts(input);
            socket.emit('getTheseProducts',res);
        })
        socket.on('update', async (input) => {
            let res = await update.update(input);
            socket.emit('updateResponse',res);
        });
        socket.on('sendJobNotices', async () => {
            let res = await select.select({command: 'jobNotice'});
            socket.emit('getJobNotices',res);
        });
        socket.on('sendEmployeeRequests', async () => {
            let res = await select.select({command: 'employeeRequests'});
            socket.emit('getEmployeeRequests',res);
        });
        socket.on('sendEmployee', async (input) => {
            let res = await employee.getEmployee(input.id);
            socket.emit('getEmployee', res);
        });
        socket.on('sendEmployeeByToken', async (input) => {
            let res = await employee.getEmployeeByToken(input);
            socket.emit('getEmployee', res);
        });
        socket.on('sendEmployeeID', async (input) => {
            let res = await employee.getEmployeeID(input);
            socket.emit('getEmployeeID', res);
        });
        socket.on('sendEmployees', async () => {
            let res = await employee.getEmployees();
            socket.emit('getEmployees', res);
        });
        socket.on('sendEmployeeHistory', async (input) => {
            let res = await employee.getEmployeeHistory(input);
            socket.emit('getEmployeeHistory',res);
        });
        socket.on('processRequest', async (input) => {
            let res = await requestProcessor.processRequest(input);
            socket.emit('processRequest',res);
        });
        socket.on('checkPostAvailability', async (input)=>{
           let res = await check.check({
               tablename: 'NOTICES',
               field: 'FIELD',
               value: input.job
           });
           let found = res.length !== 0;
           socket.emit('checkPostAvailability',found);
        });
        socket.on('sendReport', async (input) => {
            let res = await report.report(input);
            socket.emit('getReport',res);
        });
        socket.on('sendPerson', async (input) => {
            let res = await persons.getPerson(input.token);
            socket.emit('getPerson', res);
        });
        socket.on('changePassword', async (input) => {
            let res = await changePassword.changePassword(input);
            socket.emit('changePasswordRes',res);
        });
        socket.on('sendCategories', async() => {
            let res = await product.getCategories();
            socket.emit('getCategories',res);
        });
        socket.on('sendProductsByCategory', async (input) => {
            let res = await product.getProductsByCategory(input.category);
            socket.emit('getProductsByCategory',res);
        });
        socket.on('sendSearchedProducts', async (input) => {
            let res = await product.getSearchedProducts(input.search);
            socket.emit('getSearchedProducts',res);
        });
        socket.on('saveCart', async (input) => {
            let res = await insert.Insert(input);
            socket.emit('saveCart',res);
        });
        socket.on('sendPendingCarts', async (input) => {
            let res = await carts.getPendingCarts(input);
            socket.emit('getPendingCarts', res);
        });
        socket.on('sendBoughtCarts', async (input) => {
            let res = await carts.getBoughtCarts(input);
            socket.emit('getBoughtCarts', res);
        });
        socket.on('sendCartItems', async (input) => {
            let res = await carts.getCartItems(input);
            socket.emit('getCartItems',res);
        });
        socket.on('makePayment', async (input) => {
            let res = await payment.makePayment(input);
            socket.emit('paymentInfo',res);
        });
        socket.on('sendAvailableOrders', async () => {
            let res = await carts.getAvailableOrders();
            socket.emit('getAvailableOrders',res);
        });
        socket.on('sendOrderInfo', async (input) => {
           let res = await carts.getOrderInfo(input);
           socket.emit('getOrderInfo',res);
        });
        socket.on('takeOrder', async (input) => {
            let res = await takeOrder.takeOrder(input);
            socket.emit('takeOrder',res);
        });
        socket.on('sendOrderHistory', async (input) => {
            let res = await carts.getOrderHistory(input);
            socket.emit('getOrderHistory', res);
        });
        socket.on('setOrderDelivered', async (input) => {
            let res = updateOrder.setOrderDelivered(input);
            socket.emit('orderUpdateInfo', res);
        });
        socket.on('sendWeeklySellReport', async () =>{
            let res = await report.weeklySellReport();
            socket.emit('getWeeklySellReport',res);
        });
        socket.on('sendMonthlySellReport', async () =>{
            let res = await report.monthlySellReport();
            socket.emit('getMonthlySellReport',res);
        });
    });
}

module.exports = {
    setServer
}
