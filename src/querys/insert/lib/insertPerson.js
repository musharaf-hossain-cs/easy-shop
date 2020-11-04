const db = require('../../../db/connectdb');
const newDb = require('../../../db/dbForImage');

async function insert(input){
    let abc = [];
    abc = input.image;
    const query =
        `INSERT INTO PERSONS 
      (PERSON_ID, FIRST_NAME, LAST_NAME, USERNAME, PASSWORD, ADDRESS, EMAIL, 
      MOBILE, DOB,GENDER,IMAGE)
       VALUES( 
        \'${input.id}\',
        \'${input.first_name}\',
        \'${input.last_name}\',
        \'${input.username}\',
        \'${input.password}\',
        \'${input.address}\',
        \'${input.email}\',
        \'${input.mobile}\',
        TO_DATE(\'${input.dob}\',\'yyyy\/mm\/dd\'),
        \'${input.gender}\'`;

    await newDb.executeQuery(query,abc);
}

module.exports = {
    insert
};
