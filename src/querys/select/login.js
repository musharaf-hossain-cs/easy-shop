const users = require('../../lib/users');
const db = require('../../db/connectdb');
const idMaker = require('../../lib/idmaker');

async function fetchData(data){
    const query =
        `select c.customer_id, c.status, p.username, p.password
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
        if(rows[0].PASSWORD === data.password){
            let token = users.getLength() + idMaker.randText(5);
            token = users.addUser(rows[0].CUSTOMER_ID, token);
            return {
                success: true,
                error: '',
                msg: 'Login Successful',
                token: token
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
