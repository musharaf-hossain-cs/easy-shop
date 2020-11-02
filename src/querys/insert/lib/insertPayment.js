const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
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
}

module.exports = {
    insert
};
