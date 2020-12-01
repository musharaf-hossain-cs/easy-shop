const product = require('./lib/productUpdate');
const person = require('./lib/personUpdate');

async function update(input){
    if(input.tablename.toLowerCase()==='product_models'){
        return await product.update(input);
    }
    else if(input.tablename.toLowerCase()==='persons'){
        return await person.update(input);
    }
}

module.exports = {
    update
}
