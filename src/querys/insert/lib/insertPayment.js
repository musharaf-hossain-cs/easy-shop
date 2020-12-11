const dbInsert = require('../../../db/dbInsert');
const insertDir = require('../insert');
const users = require('../../../lib/users');
const idMaker = require('../../../lib/idmaker');
const dbUpdate = require('../../../db/dbUpdate');

async function insertPayment(input){
    return await dbInsert.executeQuery(
        `INSERT INTO PAYMENTS
        (PAYMENT_ID, PAYMENT_TYPE, AMOUNT, PAYMENT_DATE, PAYMENT_STATUS)
        VALUES(
            \'${input.id}\',
            \'${input.type}\',
            ${input.amount},
            TO_DATE(\'${input.date}\',\'yyyy\/mm\/dd\'),
            \'${input.status}\'
        )`
    );
}

async function insertOrder(input){
    let c_id = users.getUser(input.customerToken);
    return await dbInsert.executeQuery(
        `INSERT INTO ORDERS
        (ORDER_ID, CUSTOMER_ID, PAYMENT_ID, CART_ID, ORDER_DATE, STATUS)
        VALUES(
            \'${idMaker.makeId()}\',
            \'${c_id}\',
            \'${input.id}\',
            \'${input.cartId}\',
            TO_DATE(\'${input.date}\',\'yyyy\/mm\/dd\'),
            \'${input.status}\'
        )`
    );
}

async function updateCart(input){
    let res1 = await dbUpdate.executeQuery(
        `UPDATE CARTS 
               SET STATUS = \'PAID\'
               WHERE CART_ID = \'${input.cartId}\'`
    );
    let res2 = await dbUpdate.executeQuery(
        `BEGIN
                    SET_PRODUCTS_CARTS(\'${input.cartId}\');
               END;`
    );
    return res1 && res2;
}

async function insert(input){
    let res1 = await insertPayment(input);
    let res2 = await insertOrder(input);
    let res3 = await updateCart(input);
    if(res1 && res2 && res3){
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
