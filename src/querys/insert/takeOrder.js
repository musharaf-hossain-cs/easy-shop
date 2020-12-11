const insert = require('./insert');
const dbUpdate = require('../../db/dbUpdate');
const users = require('../../lib/users');

async function updateOrder(orderId){
    let query =
        `UPDATE ORDERS
         SET STATUS = \'Shiping\'
         WHERE ORDER_ID = \'${orderId}\'`;
    return await dbUpdate.executeQuery(query);
}

async function takeOrder(input){
    input.employeeId = users.getUser(input.token);
    let res1 = await updateOrder(input.orderId);
    let res2 = await insert.Insert(input);

    if(res1 && res2){
        return {
            success: true
        };
    }else{
        return {
            success: false
        };
    }
}

module.exports = {
    takeOrder
}
