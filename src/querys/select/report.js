const dbSelect = require('../../db/dbSelect');

async function monthlySalaryReport(){
    const query =
        `SELECT J.JOB_TITLE AS "JOB", COUNT(*) AS "COUNT", SUM(SALARY) AS "SALARY"
         FROM EMPLOYEES E
         JOIN JOBS J ON E.JOB_ID = J.JOB_ID
         WHERE E.STATUS='Active'
         GROUP BY J.JOB_TITLE`;
    return await dbSelect.executeQuery(query);
}

async function weeklySellReport(){
    let query =
        `SELECT C.MODEL_ID,P.MODEL_NAME, SUM(C.QUANTITY) AS "SOLD",
        SUM(ROUND(P.PRICE *(1-P.DISCOUNT/100)*C.QUANTITY)) AS TOTAL_COST
        FROM ORDERS O
        JOIN CART_PRODUCTS C ON O.CART_ID = C.CART_ID
        JOIN PRODUCT_MODELS P ON P.MODEL_ID = C.MODEL_ID
        WHERE (SYSDATE - O.ORDER_DATE) <= 7
        GROUP BY C.MODEL_ID, P.MODEL_NAME`;
    return await dbSelect.executeQuery(query);
}

async function monthlySellReport(){
    let query =
        `SELECT C.MODEL_ID,P.MODEL_NAME, SUM(C.QUANTITY) AS "SOLD",
        SUM(ROUND(P.PRICE *(1-P.DISCOUNT/100)*C.QUANTITY)) AS TOTAL_COST
        FROM ORDERS O
        JOIN CART_PRODUCTS C ON O.CART_ID = C.CART_ID
        JOIN PRODUCT_MODELS P ON P.MODEL_ID = C.MODEL_ID
        WHERE (SYSDATE - O.ORDER_DATE) <= 30
        GROUP BY C.MODEL_ID, P.MODEL_NAME`;
    return await dbSelect.executeQuery(query);
}

async function sellReport(){
    let res1 = await weeklySellReport();
    let res2 = await monthlySellReport();
    let result = [res1, res2];
    return result;
}

async function report(input){
    let result;
    if(input.topic.toLowerCase()==='monthlysalary'){
        result = await monthlySalaryReport();
    }
    else if(input.topic.toLowerCase()==='sellreport'){
        result = await sellReport();
    }

    return result;
}
module.exports = {
    report,
    weeklySellReport,
    monthlySellReport
};
