const db = require('../../../db/connectdb');

async function insert(input){
    await db.executeQuery(
        `INSERT INTO PERSONS 
      (PERSON_ID, FIRST_NAME, LAST_NAME, USERNAME, PASSWORD, ADDRESS, EMAIL, MOBILE, DOB,GENDER)
       VALUES( 
        \'${input.id}\',
        \'${input.first_name}\',
        \'${input.last_name}\',
        \'${input.username}\',
        \'${input.password}\',
        \'${input.address}\',
        \'${input.email}\',
        \'${input.mobile}\',
        TO_DATE(\'${input.dob}\',\'dd\/mm\/yyyy\'),
        \'${input.gender}\'
        ) `
    );
}

module.exports = {
    insert
};
