const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
        `INSERT INTO DELIVERY
        (DELIVERY_ID, CUSTOMER_ID, PAYMENT_ID, EMPLOYEE_ID,
        STATUS, SHIPMENT_DATE, DELIVERY_DATE)
        VALUES(
            \'${input.id}\',
            \'${input.customerId}\',
            \'${input.paymentId}\',
            \'${input.employeeId}\',
            \'${input.status}\',
            TO_DATE(\'${input.shipmentDate}\',\'dd\/mm\/yyyy\'),
            TO_DATE(\'${input.deliveryDate}\',\'dd\/mm\/yyyy\')
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
