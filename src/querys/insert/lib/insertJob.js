const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
        `INSERT INTO JOBS
        (JOB_ID, JOB_TITLE, SALARY)
        VALUES(
            \'${input.id}\',
            \'${input.title}\',
            ${input.salary}
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
