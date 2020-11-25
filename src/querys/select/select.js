const db = require('../../db/dbSelect');
const oracledb = require('oracledb');

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

}

module.exports = {
    getCustomer,
    select
}
