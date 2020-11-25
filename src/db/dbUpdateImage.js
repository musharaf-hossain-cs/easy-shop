const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

async function executeQuery(query,img,where){
    let connection;
    try{
        connection = await oracledb.getConnection({
            user          : "EASYSHOP",
            password      : "easyshop",
            connectString : "localhost/ORCL"
        });
        if(connection) console.log('Connection Successful');
        await connection.execute(
            `${query}
            :content
            ${where}`,[img]
        );
        return true;

    }catch(err){
        console.error(err);
        return false;
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
