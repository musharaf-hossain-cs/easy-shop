const db = require('../../../db/connectdb');
const person = require('./insertPerson');

async function insertCustomer(input){
    await db.executeQuery(
        `INSERT INTO CUSTOMERS
         (CUSTOMER_ID, STATUS)
         VALUES(
            \'${input.id}\',
            'Active'
         ) `
    );
}

async function insert(input){
    await person.insert(input);
    await insertCustomer(input);
}

module.exports = {
  insert
};
