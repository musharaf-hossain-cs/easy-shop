const dbInsert = require('../../../db/dbInsert');

async function insert(input){
    let res = await dbInsert.executeQuery(
        `INSERT INTO NOTICES
        (NOTICE_ID, TOPIC, FIELD, VALUE)
        VALUES(
            \'${input.id}\',
            \'${input.topic}\',
            \'${input.field}\',
            \'${input.value}\'
            
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
