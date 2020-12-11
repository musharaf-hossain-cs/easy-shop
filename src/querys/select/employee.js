const dbSelect = require('../../db/dbSelect');
const oracledb = require('oracledb');
const users = require('../../lib/users');

const binds = {};
const opts = {
    fetchInfo: {
        IMAGE:{
            type: oracledb.BUFFER
        }
    }
};

async function getEmployees(){
    const query =
        `SELECT E.EMPLOYEE_ID, J.JOB_TITLE, E.STATUS, E.HIRED_DATE, P.USERNAME,
         P.FIRST_NAME, P.LAST_NAME, P.EMAIL, P.MOBILE, P.ADDRESS, P.GENDER,
         P.DOB, P.IMAGE, ROUND(MONTHS_BETWEEN(SYSDATE,P.DOB)/12) AS AGE
         FROM EMPLOYEES E 
         JOIN PERSONS P ON E.EMPLOYEE_ID = P.PERSON_ID
         JOIN JOBS J ON J.JOB_ID = E.JOB_ID
         WHERE E.STATUS = 'Active'`;

    return await dbSelect.executeQuery(query,binds,opts);
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
    return await dbSelect.executeQuery(query,binds,opts);
}

async function getEmployeeID(input){
    const query =
        `SELECT PERSON_ID AS "EMPLOYEE_ID"
         FROM PERSONS
         WHERE ${input.field} = \'${input.value}\'`;
    return await dbSelect.executeQuery(query,binds,opts);
}

async function getEmployeeByToken(token){
    let id = users.getUser(token);
    return await getEmployee(id);
}

async function getEmployeeHistory(token){
    let id = users.getUser(token);
    let query =
        `SELECT D.DELIVERY_ID, O.ORDER_ID, D.SHIPMENT_DATE, 
         D.DELIVERY_DATE, P.USERNAME, P.ADDRESS
         FROM DELIVERY D
         JOIN ORDERS O ON O.ORDER_ID = D.ORDER_ID
         JOIN PERSONS P ON P.PERSON_ID = O.CUSTOMER_ID
         WHERE D.EMPLOYEE_ID = \'${id}\'`;
    return await dbSelect.executeQuery(query,binds,opts);

}

module.exports = {
    getEmployee,
    getEmployees,
    getEmployeeID,
    getEmployeeByToken,
    getEmployeeHistory
}
