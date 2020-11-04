const db = require('../../db/connectdb');
const oracledb = require('oracledb');

async function check(data){
    const query =
        `SELECT *
        FROM ${data.tablename}
        WHERE ${data.field} = \'${data.value}\'`;

    let result = await db.executeQuery(query);
    return result;
}

module.exports = {
  check
};
