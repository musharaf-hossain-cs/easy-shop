function randText(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeId(){//3.9*10^17
    let id="";
    let d = new Date();
    id = id + randText(2) + d.getFullYear() + randText(2) + d.getMonth()
        + randText(2) + d.getDay() + randText(2) + d.getHours() + randText(2)
        + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
    return id;
}

module.exports = {
  makeId
};
