const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
        `INSERT INTO PRODUCTS
        (PRODUCT_ID, MODEL_ID)
        VALUES(
            \'${input.id}\',
            \'${input.modelId}\'
        )`
    );
}

module.exports = {
    insert
};
