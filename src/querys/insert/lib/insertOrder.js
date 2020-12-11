const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    return await dbInsert.executeQuery(
        `INSERT INTO ORDERS
        (ORDER_ID, CUSTOMER_ID, PAYMENT_ID, CART_ID, ORDER_DATE, STATUS)
        VALUES(
            \'${input.id}\',
            \'${input.customerId}\',
            \'${input.paymentId}\',
            \'${input.cartId}\',
            TO_DATE(\'${input.orderDate}\',\'yyyy\/mm\/dd\'),
            \'${input.status}\'
        )`
    );
}

module.exports = {
    insert
};
