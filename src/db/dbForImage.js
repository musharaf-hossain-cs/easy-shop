const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

async function executeQuery(query,abc){
    let connection;
    try{
        connection = await oracledb.getConnection({
            user          : "EASYSHOP",
            password      : "easyshop",
            connectString : "localhost/ORCL"
        });
        const binds = {};
        const opts = {
            fetchInfo: {
                IMAGE:{
                    type: oracledb.BUFFER
                }
            }
        };
        if(connection) console.log('Connection Successful');
        const result = await connection.execute(
            `${query},
            :content)`,[abc]
        );
        return result.rows;

    }catch(err){
        console.error(err);
    }finally {
        if(connection){
            try{
                await connection.close();
                console.log('Connection Closed!');
            }catch (e) {
                console.error(e);
            }
        }
    }
}

module.exports = {
    executeQuery
};
