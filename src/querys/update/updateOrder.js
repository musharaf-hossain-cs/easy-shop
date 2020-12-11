const dbUpdate = require('../../db/dbUpdate');

async function setDeliverDate(orderId){
    let date = (new Date().toLocaleDateString()).split('/');
    let today = date[2]+'/'+date[0]+'/'+date[1];
    let query =
        `UPDATE DELIVERY
         SET DELIVERY_DATE =
         TO_DATE(\'${today}\', \'yyyy\/mm\/dd\')
         WHERE ORDER_ID = \'${orderId}\'`;
    return await dbUpdate.executeQuery(query);
}

async function setOrderDelivered(orderId){
    let query =
        `UPDATE ORDERS
         SET STATUS = \'Delivered\'
         WHERE ORDER_ID = \'${orderId}\'`;
    let res1 = await dbUpdate.executeQuery(query);
    let res2 = await setDeliverDate(orderId);
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
    setOrderDelivered
}
