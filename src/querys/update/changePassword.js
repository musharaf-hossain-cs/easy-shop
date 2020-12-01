const users = require('../../lib/users');
const dbSelect = require('../../db/dbSelect');
const dbUpdate = require('../../db/dbUpdate');

async function isValid(input,id){
    let query =
        `SELECT PASSWORD 
         FROM PERSONS
         WHERE PERSON_ID = \'${id}\'`;
    let res = await dbSelect.executeQuery(query);
    if(res.length>0){
        let password = res[0].PASSWORD;
        return input.oldPassword === password;
    }else{
        return false;
    }
}

async function changePassword(input){
    let id = users.getUser(input.token);
    let valid = await isValid(input,id);
    if(valid){
        let query =
            `UPDATE PERSONS
             SET PASSWORD = \'${input.newPassword}\'
             WHERE PERSON_ID = \'${id}\'`;
        let res = await dbUpdate.executeQuery(query);
        return {
            success: res
        };
    }else{
        return {
            success: false
        };
    }
}

module.exports = {
    changePassword
};
