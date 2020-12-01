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
        socket.on('sendEmployeeID', async (input) => {
            let res = await employee.getEmployeeID(input);
            socket.emit('getEmployeeID', res);
        });
        socket.on('sendEmployees', async () => {
            let res = await employee.getEmployees();
            socket.emit('getEmployees', res);
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
    });
}

module.exports = {
    setServer
}
