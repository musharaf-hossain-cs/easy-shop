const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
        `INSERT INTO ORDERS
        (ORDER_ID, CUSTOMER_ID, PAYMENT_ID, CART_ID, ORDER_DATE, STATUS)
        VALUES(
            \'${input.id}\',
            \'${input.customerId}\',
            \'${input.paymentId}\',
            \'${input.cartId}\',
            TO_DATE(\'${input.orderDate}\',\'dd\/mm\/yyyy\'),
            \'${input.status}\'
        )`
    );
}

module.exports = {
    insert
};
