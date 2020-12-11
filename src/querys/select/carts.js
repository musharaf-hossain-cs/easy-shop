const dbSelect = require('../../db/dbSelect');
const users = require('../../lib/users');
const oracledb = require('oracledb');

const binds = {};
const opts = {
    fetchInfo: {
        IMAGE:{
            type: oracledb.BUFFER
        }
    }
};

async function getPendingCarts(token){
    let c_id = users.getUser(token);
    return await dbSelect.executeQuery(
        `SELECT CART_ID, CREATE_DATE+1 as "CREATE_DATE", TOTAL_COST, STATUS
               FROM CARTS WHERE STATUS = \'Pending\'
               AND CUSTOMER_ID = \'${c_id}\'`
    );
}

async function getCartItems(cartId){
    return await dbSelect.executeQuery(
        `SELECT P.MODEL_ID,P.MODEL_NAME,P.PRICE,P.DISCOUNT,CP.QUANTITY,P.STOCK
               FROM PRODUCT_MODELS P
               JOIN CART_PRODUCTS CP ON CP.MODEL_ID = P.MODEL_ID
               WHERE CP.CART_ID = \'${cartId}\'`
    );
}

async function getBoughtCarts(customerToken){
    let c_id = users.getUser(customerToken);
    return await dbSelect.executeQuery(
        `SELECT C.CART_ID, C.TOTAL_COST, C.CREATE_DATE
               FROM CARTS C
               JOIN ORDERS O ON C.CART_ID = O.CART_ID
               WHERE O.CUSTOMER_ID = \'${c_id}\'`
    );
}

async function getAvailableOrders(){
    let query =
        `SELECT O.ORDER_ID, O.ORDER_DATE, P.USERNAME, P.ADDRESS
         FROM PERSONS P
         JOIN ORDERS O ON O.CUSTOMER_ID = P.PERSON_ID
         WHERE UPPER(O.STATUS) = \'PAID\'`;
    return await dbSelect.executeQuery(query,binds,opts);
}

async function getOrderInfo(orderId){
    let query =
        `SELECT O.ORDER_ID, O.ORDER_DATE, P.USERNAME, P.ADDRESS, O.CART_ID, O.STATUS
         FROM PERSONS P
         JOIN ORDERS O ON O.CUSTOMER_ID = P.PERSON_ID
         WHERE O.ORDER_ID = \'${orderId}\'`;
    return await dbSelect.executeQuery(query,binds,opts);
}

async function getOrderHistory(customerToken){
    let c_id = users.getUser(customerToken);
    let query =
        `SELECT ORDER_ID, CART_ID, PAYMENT_ID, ORDER_DATE, STATUS
         FROM ORDERS
         WHERE CUSTOMER_ID = \'${c_id}\'`;
    return await dbSelect.executeQuery(query,binds,opts);
}

module.exports = {
    getPendingCarts,
    getCartItems,
    getBoughtCarts,
    getAvailableOrders,
    getOrderInfo,
    getOrderHistory
}
