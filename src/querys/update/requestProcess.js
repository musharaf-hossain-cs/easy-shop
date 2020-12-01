const dbInsert = require('../../db/dbInsert');

async function processRequest(input){
    let query =
        `BEGIN 
              PROCESS_REQUEST(
              \'${input.id}\',
              \'${input.job}\',
              \'${input.command}\'
              );
         END;
         `;
    let res = await dbInsert.executeQuery(query);
    return {
        success:res
    };
}

module.exports = {
    processRequest
}
