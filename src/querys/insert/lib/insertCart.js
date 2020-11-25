const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
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
