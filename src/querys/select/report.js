const db = require('../../db/dbSelect');

async function monthlySalaryReport(){
    const query =
        `SELECT J.JOB_TITLE AS "JOB", COUNT(*) AS "COUNT", SUM(SALARY) AS "SALARY"
         FROM EMPLOYEES E
         JOIN JOBS J ON E.JOB_ID = J.JOB_ID
         WHERE E.STATUS='Active'
         GROUP BY J.JOB_TITLE`;
    return await db.executeQuery(query);
}

async function report(input){
    let result;
    if(input.topic.toLowerCase()==='monthlysalary'){
        result = await monthlySalaryReport();
    }

    return result;
}
module.exports = {
    report
};
