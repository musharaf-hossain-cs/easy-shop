const cart = require('./lib/insertCart');
const customer = require('./lib/insertCustomer');
const delivery = require('./lib/insertDelivery');
const employee = require('./lib/insertEmployee');
const job = require('./lib/insertJob');
const order = require('./lib/insertOrder');
const payment = require('./lib/insertPayment');
const product = require('./lib/insertProduct');
const productModel = require('./lib/insertProduct-model');

const idmaker = require('../../lib/idmaker');


async function Insert(input){
    input.id = idmaker.makeId();
    if(input.tablename.toLowerCase() === 'carts'){
        await cart.insert(input);
    }
    if(input.tablename.toLowerCase() === 'customers'){
        await customer.insert(input);
    }
    if(input.tablename.toLowerCase() === 'delivery'){
        await delivery.insert(input);
    }
    if(input.tablename.toLowerCase() === 'employees'){
        await employee.insert(input);
    }
    if(input.tablename.toLowerCase() === 'jobs'){
        await job.insert(input);
    }
    if(input.tablename.toLowerCase() === 'orders'){
        await order.insert(input);
    }
    if(input.tablename.toLowerCase() === 'payments'){
        await payment.insert(input);
    }
    if(input.tablename.toLowerCase() === 'products'){
        await product.insert(input);
    }
    if(input.tablename.toLowerCase() === 'product_models'){
        await productModel.insert(input);
    }

}

module.exports = {
    Insert
};
