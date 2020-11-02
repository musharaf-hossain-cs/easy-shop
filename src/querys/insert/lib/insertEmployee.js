const db = require('../../../db/connectdb');
const person = require('./insertPerson');

async function insertEmployee(input){
    await db.executeQuery(
        `INSERT INTO EMPLOYEES
         (EMPLOYEE_ID, JOB_ID, HIRED_DATE, STATUS)
         VALUES(
            \'${input.id}\',
            \'${input.jobId}\',
            TO_DATE(\'${input.hiredDate}\',\'dd\/mm\/yyyy\'),
            'Active'
         ) `
    );
}

async function insert(input){
    await person.insert(input);
    await insertEmployee(input);
}

module.exports = {
    insert
};
