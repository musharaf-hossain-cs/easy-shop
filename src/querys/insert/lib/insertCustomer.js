const dbInsert = require('../../../db/dbInsert');
const person = require('./insertPerson');

async function insertCustomer(input){
    return await dbInsert.executeQuery(
        `INSERT INTO CUSTOMERS
         (CUSTOMER_ID, STATUS)
         VALUES(
            \'${input.id}\',
            'Active'
         ) `
    );
}

async function insert(input){
    let res1;
    let res2;
    res1 = await person.insert(input);
    res2 = await insertCustomer(input);
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
