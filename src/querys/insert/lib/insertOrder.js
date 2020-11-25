const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
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
    if(res){
        return {
            success: true
        };
    }else{
        return{
            success: false
        };
    }
}

module.exports = {
    insert
};
