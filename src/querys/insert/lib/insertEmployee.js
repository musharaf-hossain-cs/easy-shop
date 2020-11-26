const dbInsert = require('../../../db/dbInsert');
const person = require('./insertPerson');

async function insertEmployee(input){
    let today = new Date();
    return await dbInsert.executeQuery(
        `BEGIN
         INSERT_EMPLOYEE(
         \'${input.id}\',
         \'${input.job}\',
         TO_DATE(\'${today.toLocaleDateString()}\',\'mm\/dd\/yyyy\')
         );
         END;
         `
    );
/*    return await dbInsert.executeQuery(
        `INSERT INTO EMPLOYEES
         (EMPLOYEE_ID, JOB_ID, HIRED_DATE, STATUS)
         VALUES(
            \'${input.id}\',
            \'${input.jobId}\',
            TO_DATE(\'${input.hiredDate}\',\'dd\/mm\/yyyy\'),
            'Active'
         ) `
    );*/
}

async function insert(input){
    let res1,res2;
    res1 = await person.insert(input);
    res2 = await insertEmployee(input);
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
