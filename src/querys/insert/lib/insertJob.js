const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
        `INSERT INTO JOBS
        (JOB_ID, JOB_TITLE, SALARY)
        VALUES(
            \'${input.id}\',
            \'${input.title}\',
            ${input.salary}
        )`
    );
}

module.exports = {
    insert
};
