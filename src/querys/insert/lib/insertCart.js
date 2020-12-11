const dbInsert = require('../../../db/dbInsert');
const users = require('../../../lib/users');

async function insertCart(input){
    let c_id = users.getUser(input.customerToken);
    return await dbInsert.executeQuery(
        `INSERT INTO CARTS
        (CART_ID, CUSTOMER_ID, CREATE_DATE, TOTAL_COST,STATUS)
        VALUES(
            \'${input.id}\',
            \'${c_id}\',
            TO_DATE(\'${input.date}\',\'yyyy\/mm\/dd\'),
            ${input.totalCost},
            \'Pending\'
        )`
    );
}

async function insertIntoCart_Products(input){
    let products = input.products;
    let res = true;
    for(let i=0;i<products.length;i++){
        let query =
            `INSERT INTO CART_PRODUCTS
            (CART_ID, MODEL_ID, QUANTITY)
            VALUES(
                \'${input.id}\',
                \'${products[i].model}\',
                ${products[i].quantity}
            )
            `;
        res = await dbInsert.executeQuery(query);
    }
    return res;
}

async function insert(input){
    let res1 = await insertCart(input);
    let res2 = await insertIntoCart_Products(input);
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
    insert
};
