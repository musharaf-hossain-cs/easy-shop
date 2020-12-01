const db = require('../../db/dbSelect');
const oracledb = require('oracledb');

async function getEmployees(){
    const query =
        `SELECT E.EMPLOYEE_ID, J.JOB_TITLE, E.STATUS, E.HIRED_DATE, P.USERNAME,
         P.FIRST_NAME, P.LAST_NAME, P.EMAIL, P.MOBILE, P.ADDRESS, P.GENDER,
         P.DOB, P.IMAGE, ROUND(MONTHS_BETWEEN(SYSDATE,P.DOB)/12) AS AGE
         FROM EMPLOYEES E 
         JOIN PERSONS P ON E.EMPLOYEE_ID = P.PERSON_ID
         JOIN JOBS J ON J.JOB_ID = E.JOB_ID
         WHERE E.STATUS = 'Active'`;
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

async function getEmployee(id){
    const query =
        `SELECT E.EMPLOYEE_ID, J.JOB_TITLE, E.STATUS, E.HIRED_DATE, P.USERNAME,
         P.FIRST_NAME, P.LAST_NAME, P.EMAIL, P.MOBILE, P.ADDRESS, P.GENDER,
         P.DOB, P.IMAGE, ROUND(MONTHS_BETWEEN(SYSDATE,P.DOB)/12) AS AGE, J.SALARY
         FROM EMPLOYEES E 
         JOIN PERSONS P ON E.EMPLOYEE_ID = P.PERSON_ID
         JOIN JOBS J ON J.JOB_ID = E.JOB_ID
         WHERE E.EMPLOYEE_ID = \'${id}\'`;
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

async function getEmployeeID(input){
    const query =
        `SELECT PERSON_ID AS "EMPLOYEE_ID"
         FROM PERSONS
         WHERE ${input.field} = \'${input.value}\'`;
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
    getEmployee,
    getEmployees,
    getEmployeeID
}
