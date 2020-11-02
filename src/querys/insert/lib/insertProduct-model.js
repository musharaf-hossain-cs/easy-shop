const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
        `INSERT INTO PRODUCT_MODELS
        (MODEL_ID, MODEL_NAME, PRICE, STOCK, SOLD, CATEGORY, BRAND)
        VALUES(
            \'${input.id}\',
            \'${input.modelName}\',
            ${input.price},
            ${input.stock},
            ${input.sold},
            \'${input.category}\',
            \'${input.brand}\'
        )`
    );
}

module.exports = {
    insert
};
