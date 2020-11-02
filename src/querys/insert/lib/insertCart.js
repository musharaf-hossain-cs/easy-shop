const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
        `INSERT INTO CARTS
        (CART_ID, CUSTOMER_ID, CREATE_DATE, EXPIRE_DATE, TOTAL_COST)
        VALUES(
            \'${input.id}\',
            \'${input.customerId}\',
            TO_DATE(\'${input.createDate}\',\'dd\/mm\/yyyy\'),
            TO_DATE(\'${input.expireDate}\',\'dd\/mm\/yyyy\'),
            ${input.totalCost}
        )`
    );
}

module.exports = {
    insert
};
