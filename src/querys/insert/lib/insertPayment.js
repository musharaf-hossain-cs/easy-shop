const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    return await dbInsert.executeQuery(
        `INSERT INTO PAYMENTS
        (PAYMENT_ID, PAYMENT_TYPE, AMOUNT, PAYMENT_DATE, PAYMENT_STATUS)
        VALUES(
            \'${input.id}\',
            \'${input.paymentTpye}\',
            ${input.amount},
            TO_DATE(\'${input.paymentDate}\',\'dd\/mm\/yyyy\'),
            \'${input.paymentStatus}\'
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
