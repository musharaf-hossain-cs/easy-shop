const newDb = require('../../../db/dbForImage');

async function insert(input){
    let img;
    img = input.image;
    const query =
        `INSERT INTO PRODUCT_MODELS
        (MODEL_ID, MODEL_NAME, PRICE, STOCK, SOLD, CATEGORY, BRAND,
        DESCRIPTION, IMAGE)
        VALUES(
            \'${input.id}\',
            \'${input.modelName}\',
            ${input.price},
            ${input.stock},
            ${input.sold},
            \'${input.category}\',
            \'${input.brand}\',
            \'${input.description}\'`;

    let res = await newDb.executeQuery(query,img);
    if(!res){
        return {
            success: false
        };
    }else{
        return {
            success: true
        }
    }
}

module.exports = {
    insert
};
