const users = require('../../lib/users');
const db = require('../../db/dbSelect');
const idMaker = require('../../lib/idmaker');

async function fetchData(data){
    const query =
        `select c.customer_id, c.status, p.username, p.password, p.first_name, 
        p.last_name
         from persons p JOIN customers c
         on c.customer_id = p.person_id
         where p.username = \'${data.username}\' `;
    return await db.executeQuery(query);
}

async function login(data){
    let rows = await fetchData(data);
    if(rows.length === 0){
        return {
            success: false,
            error: 101,
            msg: 'Wrong Username!'
        };
    }
    else{
        let res = rows[0];
        if(res.PASSWORD === data.password){
            let token = users.getLength() + idMaker.randText(5);
            token = users.addUser(res.CUSTOMER_ID, token);
            return {
                success: true,
                error: '',
                msg: 'Login Successful',
                user: {
                    token: token,
                    username: res.USERNAME,
                    first_name: res.FIRST_NAME,
                    last_name: res.LAST_NAME
                }
            };
        }else{
            return{
                success: false,
                error: 102,
                msg: 'Wrong Password'
            };
        }
    }
}

module.exports = {
    login
}
