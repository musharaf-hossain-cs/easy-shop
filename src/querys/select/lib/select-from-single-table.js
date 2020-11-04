const db = require('../../../db/connectdb');

async function select(input){

    return await db.executeQuery(
        `SELECT ${input.selection}
               FROM ${input.tablename}
               WHERE ${input.condition}
               ORDER BY ${input.orderby}`
    );
}

module.exports = {
    select
}
