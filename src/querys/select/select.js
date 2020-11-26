const db = require('../../db/dbSelect');
const oracledb = require('oracledb');
const selectFromSingleTable = require('./lib/select-from-single-table');

async function getCustomer(){
    const query =
        `select *
         from customers join persons
         on customers.customer_id = persons.person_id`;
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
}

module.exports = {
    getCustomer,
    select
}
