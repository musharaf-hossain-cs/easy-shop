const db = require('../../db/dbSelect');
const oracledb = require('oracledb');
const selectFromSingleTable = require('./lib/select-from-single-table');

const binds = {};
const opts = {
    fetchInfo: {
        IMAGE:{
            type: oracledb.BUFFER
        }
    }
};

async function select(input){
    if(input.command === 'jobNotice'){
        let data = {
            selection: '*',
            tablename: 'notices',
            condition: '5=5',
            orderby: 'FIELD ASC'
        }
        return await selectFromSingleTable.select(data);
    }
    else if(input.command === 'employeeRequests'){
        let query =
            `select e.employee_id, j.job_title,p.USERNAME, p.IMAGE,
             p.FIRST_NAME || ' ' || p.LAST_NAME AS "NAME"
             from employees e join jobs j on e.job_id = j.job_id
             join persons p on e.EMPLOYEE_ID = p.PERSON_ID
             where e.status = 'Pending'`;
        return db.executeQuery(query,binds,opts);
    }
}

module.exports = {
    select
}
