const dbForImage = require('../../../db/dbInsertImage');
const idMaker = require('../../../lib/idmaker');
const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let img;
    img = input.image;
    const query =
        `INSERT INTO PRODUCT_MODELS
        (MODEL_ID, MODEL_NAME, PRICE, STOCK, DISCOUNT,
        SOLD, CATEGORY, BRAND, DESCRIPTION, IMAGE)
        VALUES(
            \'${input.id}\',
            \'${input.modelName}\',
            ${input.price},
            ${input.stock},
            ${input.discount},
            ${input.sold},
            \'${input.category}\',
            \'${input.brand}\',
            \'${input.description}\'`;

    let res1 = await dbForImage.executeQuery(query,img);
    let res2;
    let i=0;
    for(i;i<input.stock;i++){
        let id = idMaker.makeId();
        let q =
            `INSERT INTO PRODUCTS
             (PRODUCT_ID, MODEL_ID)
             VALUES(
             \'${id}\',
             \'${input.id}\'
             )`;
        res2 = await dbInsert.executeQuery(q);
    }
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
