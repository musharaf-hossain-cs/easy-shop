const dbDelete = require('../../db/dbDelete');

async function deleteRecord(input){
    let query = `DELETE FROM ${input.tablename} WHERE ${input.field} = \'${input.value}\'`;
    let res = await dbDelete.executeQuery(query);

    return {
        success: res
    };
}

module.exports = {
    deleteRecord
};
