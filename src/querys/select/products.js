const db = require('../../db/dbSelect');
const oracledb = require('oracledb');

async function getProducts(){
    const query =
        `SELECT MODEL_ID, MODEL_NAME, CATEGORY,PRICE, IMAGE,STOCK,DISCOUNT
         FROM PRODUCT_MODELS`;
    const binds = {};
    const opts = {
        fetchInfo: {
            IMAGE:{
                type: oracledb.BUFFER
            }
        }
    };
    return await db.executeQuery(query,binds,opts);
}

async function getProduct(id){
    const query =
        `SELECT *
         FROM PRODUCT_MODELS
         WHERE MODEL_ID = \'${id}\'`;
    const binds = {};
    const opts = {
        fetchInfo: {
            IMAGE:{
                type: oracledb.BUFFER
            }
        }
    };
    return await db.executeQuery(query,binds,opts);
}

module.exports = {
    getProduct,
    getProducts
}
