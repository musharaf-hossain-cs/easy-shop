const dbImageUpdate = require('../../../db/dbUpdateImage');
const dbUpdate = require('../../../db/dbUpdate');
const users = require('../../../lib/users');

function makeUpdateString(fields){
    let string = 'SET';
    let i=0;
    for(i;i<fields.length;i++){
        let str = ' ';
        str += fields[i].field;
        str += ' = ';
        str += '\''+ fields[i].value+'\'';
        str += ','
        string += str;
    }
    string = string.slice(0,-1);
    return string;
}

async function update(input){
    let idField = 'PERSON_ID';
    let res1 = true;
    let res2 = true;
    let id = users.getUser(input.token);

    if(input.hasImage){
        let img = input.image;
        let query =
            `UPDATE ${input.tablename}
            SET IMAGE = `;
        let where =
            `WHERE ${idField} = \'${id}\'`;
        res1 = await dbImageUpdate.executeQuery(query,img,where);
    }

    if(input.hasFields){
        let query =
            `UPDATE ${input.tablename}
            ${makeUpdateString(input.fields)}
            WHERE ${idField} = \'${id}\'`;
        console.log(query);
        res2 = await dbUpdate.executeQuery(query);
    }

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
    update
}
