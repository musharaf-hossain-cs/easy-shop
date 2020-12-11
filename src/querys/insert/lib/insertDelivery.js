const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
        `INSERT INTO DELIVERY
        (DELIVERY_ID, ORDER_ID, EMPLOYEE_ID, SHIPMENT_DATE)
        VALUES(
            \'${input.id}\',
            \'${input.orderId}\',
            \'${input.employeeId}\',
            TO_DATE(\'${input.shipmentDate}\',\'yyyy\/mm\/dd\')
        )`
    );
    return res;
}

module.exports = {
    insert
};
