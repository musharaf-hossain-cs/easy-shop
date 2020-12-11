const insert = require('./insert');

async function insertPayment(input){
    return await insert.Insert({
       id: '',
       tablename: 'payments',
       paymentType: input.type,
       amount: input.amount,
       paymentDate: input.date,
       paymentStatus: input.status
    });
}

async function insertOrder(input){
    return await insert.Insert({
       id: '',

    });
}

async function makePayment(input){
    let res1 = await insertPayment(input);
    let res2 = await insertOrder(input);
}

module.exports = {
    makePayment
}
