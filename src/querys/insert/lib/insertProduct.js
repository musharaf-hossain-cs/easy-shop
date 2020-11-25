const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
        `INSERT INTO PRODUCTS
        (PRODUCT_ID, MODEL_ID)
        VALUES(
            \'${input.id}\',
            \'${input.modelId}\'
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
