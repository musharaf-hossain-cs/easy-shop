let users = [];

function addUser(id, token){
    let idx = users.findIndex(user => user.id === id);
    if(idx >= 0) {
        console.log(users);
        return users[idx].token;
    }
    users.push({
        id:id,
        token: token
    });
    console.log(users);
    return token;
}

function getUser(token){
    for(user in users){
        if(user.token === token)
            return user.id;
    }
    return -1;
}

function getLength(){
    return users.length;
}

module.exports = {
    addUser,
    getUser,
    getLength
};

