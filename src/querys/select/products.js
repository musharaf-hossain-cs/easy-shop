const db = require('../../db/dbSelect');
const oracledb = require('oracledb');

const binds = {};
const opts = {
    fetchInfo: {
        IMAGE:{
            type: oracledb.BUFFER
        }
    }
};

async function getProducts(){
    const query =
        `SELECT MODEL_ID, MODEL_NAME, CATEGORY,PRICE, IMAGE,STOCK,DISCOUNT
         FROM PRODUCT_MODELS`;

    return await db.executeQuery(query,binds,opts);
}

async function getProduct(id){
    const query =
        `SELECT *
         FROM PRODUCT_MODELS
         WHERE MODEL_ID = \'${id}\'`;

    return await db.executeQuery(query,binds,opts);
}

async function getCategories(){
    const query =
        `SELECT DISTINCT CATEGORY
        FROM PRODUCT_MODELS`;
    return await db.executeQuery(query,binds,opts);
}

async function getProductsByCategory(category){
    let query;
    if(category.toLowerCase()==='all'){
        query =
            `SELECT MODEL_ID, MODEL_NAME, CATEGORY,PRICE, IMAGE,STOCK,DISCOUNT
             FROM PRODUCT_MODELS`;
    }else{
        query =
            `SELECT MODEL_ID, MODEL_NAME, CATEGORY,PRICE, IMAGE,STOCK,DISCOUNT
             FROM PRODUCT_MODELS WHERE CATEGORY = \'${category}\'`;
    }
    return await db.executeQuery(query,binds,opts);
}

async function getSearchedProducts(value){
    let query =
        `SELECT MODEL_ID, MODEL_NAME, CATEGORY,PRICE, IMAGE,STOCK,DISCOUNT
         FROM PRODUCT_MODELS
         WHERE UPPER(CATEGORY) LIKE UPPER(\'%${value}%\')
         OR UPPER(MODEL_NAME) LIKE UPPER(\'%${value}%\')`;
    return await db.executeQuery(query,binds,opts);
}

async function getTheseProducts(ids){
    let query =
        `SELECT MODEL_ID, MODEL_NAME, CATEGORY,PRICE, IMAGE,STOCK,DISCOUNT
         FROM PRODUCT_MODELS WHERE MODEL_ID IN (${ids})`
    return await db.executeQuery(query,binds,opts);
}

module.exports = {
    getProduct,
    getProducts,
    getCategories,
    getProductsByCategory,
    getSearchedProducts,
    getTheseProducts
}
