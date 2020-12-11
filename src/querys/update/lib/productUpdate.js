const dbImageUpdate = require('../../../db/dbUpdateImage');
const dbUpdate = require('../../../db/dbUpdate');
const idMaker = require('../../../lib/idmaker');
const dbInsert = require('../../../db/dbInsert');

function makeUpdateString(fields){
    let string = 'SET';
    let i=0;
    for(i;i<fields.length;i++){
        let str = ' ';
        str += fields[i].field;
        str += ' = ';
        str += fields[i].value;
        str += ','
        string += str;
    }
    string = string.slice(0,-1);
    return string;
}

async function update(input){
    let idField = 'MODEL_ID';
    let res1 = true;
    let res2 = true;
    let res3 = true;
    let id = input.id;

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

        if(input.stock>0){
            let i=0;
            for(i;i<input.stock;i++){
                let pid = idMaker.makeId();
                let q =
                    `INSERT INTO PRODUCTS
                     (PRODUCT_ID, MODEL_ID)
                     VALUES(
                     \'${pid}\',
                     \'${id}\'
                     )`;
                res3 = await dbInsert.executeQuery(q);
            }
        }else if(input.stock<0 && res2){
            let stock = input.stock*(-1);
            let q =
                `BEGIN
                      DELETE_PRODUCTS(
                         \'${id}\',
                         TO_NUMBER(${stock})
                      );
                 END;`;
                res3 = await dbUpdate.executeQuery(q);
        }

    }

    if(res1 && res2 && res3){
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
