const users = require('../../lib/users');
const db = require('../../db/dbSelect');
const idMaker = require('../../lib/idmaker');

async function fetchData(data){
    const query =
        `SELECT PERSON_ID, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME,
         IMAGE, TYPE, PERSON_STATUS(PERSON_ID,TYPE) AS "STATUS"
         FROM PERSONS
         WHERE USERNAME = \'${data.username}\'`;
    return await db.executeQuery(query);
}

async function fetchDataById(id){
    const query =
        `SELECT PERSON_ID, USERNAME, PASSWORD, FIRST_NAME, LAST_NAME,
         IMAGE, TYPE, PERSON_STATUS(PERSON_ID,TYPE) AS "STATUS"
         FROM PERSONS
         WHERE PERSON_ID = \'${id}\'`;
    return await db.executeQuery(query);
}

async function executeLogin(data){
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
            token = users.addUser(res.PERSON_ID, token);
            return {
                success: true,
                error: '',
                msg: 'Login Successful',
                user: {
                    token: token,
                    username: res.USERNAME,
                    first_name: res.FIRST_NAME,
                    last_name: res.LAST_NAME,
                    image: res.IMAGE,
                    status: res.STATUS,
                    type: res.TYPE
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

async function checkLogin(token){
    let id = users.getUser(token);
    if(id !== -1){
        let rows = await fetchDataById(id);
        if(rows.length === 0){
            return {
                success: false,
                error: 101,
                msg: 'Not found!'
            };
        }
        else{
            let res = rows[0];
            return {
                success: true,
                error: '',
                msg: 'Login Successful',
                user: {
                    token: token,
                    username: res.USERNAME,
                    first_name: res.FIRST_NAME,
                    last_name: res.LAST_NAME,
                    image: res.IMAGE,
                    status: res.STATUS,
                    type: res.TYPE
                }
            };
        }
    }else{
        return {
            success: false,
            error: 101,
            msg: 'Not found!'
        };
    }
}

async function login(input){
    if(input.command.toLowerCase() === 'login'){
        return await executeLogin(input);
    }
    else if(input.command.toLowerCase() === 'checklogin'){
        return await checkLogin(input.token);
    }
}

module.exports = {
    login
}
