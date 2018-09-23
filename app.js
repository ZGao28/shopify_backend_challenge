/*

App setup stuff

*/

// porting in and initializing modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const joi = require('joi');

//authorization for connecting to mongo Atlas, kept in gitignore
const auth = require('./mongoauth');

// database interfacing functions
const shopfunc = require('./repos/shop');
const productfunc = require('./repos/product');
const orderfunc = require('./repos/order');
const lineitemfunc = require('./repos/lineitem');
let db;


// Express setup stuff
app.use(express.static(__dirname + '/static-pages/'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to mongo and start the app on port 3500
MongoClient.connect(`mongodb+srv://${auth.mongoID}:${auth.mongoPass}@donations-pqltl.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Error Connecting to Database \n'); 
        return err;
    }
    // Use db shopify
    db = client.db('shopify');
    app.listen(8080, '0.0.0.0', () => {console.log('listening on PORT 8080!')});
});








/* 

Shop routing

*/

// Define shop schemas
const shopSchema = joi.object().keys({
    shopname: joi.string().required(),
    description: joi.string().required() 
});

const updateShopSchema = joi.object().keys({
    shopname: joi.string().required(),
    newname: joi.string().required(),
    description: joi.string().required() 
});

const deleteShopSchema = joi.object().keys({
    shopname: joi.string().required()
});


// Post request for creating empty shop, must have key of store name and description
// No option to load products or orders until after shop is created
app.post('/api/create_shop', (req, res) => {

    // Validation with joi to make sure request body follows shop schema
    let validated = joi.validate(req.body, shopSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;
    
    //create shop object
    let query = {
        name: body.shopname,
        description: body.description,
        products:{},
        orders: {}
    }

    // Insert shop object into collection and return status
    shopfunc.createShop(db, query).then((ret)=>{
        res.send(ret);
    }).catch((rej)=>{
        res.send(rej);
    });
});

// Post request to remove shop
app.post('/api/remove_shop', (req, res) => {
    
    // Check to make sure request has proper info
    let validated = joi.validate(req.body, deleteShopSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;
    
    // Delete the shop with that name
    shopfunc.deleteShop(db, body.shopname).then((ret)=>{
        res.send(ret);
    }).catch((rej)=>{
        res.send(rej);
    });
});

// Post request to edit shop info
app.post('/api/update_shop', (req, res) => {
    
    // Check to make sure request has proper info
    let validated = joi.validate(req.body, updateShopSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;

    // build the query for edit
    let query = {
        newname: body.newname,
        name: body.shopname,
        description: body.description
    }
    
    // update shop info
    shopfunc.updateShop(db, query).then((ret)=>{
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});

// Get request to return shop data
app.get('/api/get_shop/*', (req, res) => {
    // get the shop name by slicing it from the end of the route url
    // need to use another function to remove all %20 and replace with spaces
    getshopname(`${req.originalUrl.slice(14)}`).then((ret)=>{
        shopfunc.getShop(db, ret).then((obj)=>{
            res.send(obj);
        }).catch((err) => {
            res.send(err);
        });
    }).catch((rej) => {
        res.send(rej);
    });
});


// return all the shops and everything in all the shops
app.get('/api/getAll', (req, res) => {
    // return shops
    shopfunc.getAll(db).then((ret)=>{
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});


// replacement function for %20 and space, in searches
async function getshopname(s){
    return await s.split('%20').join(' ');
}








/* 

Product related routing!

*/



// create product schemas
const productSchema = joi.object().keys({
    shopname: joi.string().required(),
    productname: joi.string().required(),
    price: joi.number().required()
});

const updateProductSchema = joi.object().keys({
    shopname: joi.string().required(),
    productname: joi.string().required(),
    newname: joi.string().required(),
    price: joi.number().required()
});

const deleteProductSchema = joi.object().keys({
    shopname: joi.string().required(),
    productname: joi.string().required()
})



//adding a product
app.post('/api/add_product', (req, res) => {

    //validate product add request
    let validated = joi.validate(req.body, productSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;
    let query = {
        name: body.productname,
        price: body.price,
        lineitems: {}
    }

    // add product
    productfunc.addProduct(db, body.shopname, body.productname, query).then((ret) => {
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});


// edit a product from a store
app.post('/api/edit_product', (req, res) => {
    let validated = joi.validate(req.body, updateProductSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;

    let query = {
        name: body.newname,
        price: body.price,
        lineitems: {}
    }
        
    productfunc.editProduct(db, body.shopname, body.productname, query).then((ret) => {
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});


// Deleting a product from a store

app.post('/api/delete_product', (req, res) => {
    // make sure request has proper variables
    let validated = joi.validate(req.body, deleteProductSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;
    productfunc.deleteProduct(db, body.shopname, body.productname).then((ret) => {
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});


// This is to get all products from a shop
app.get('/api/get_products/*', (req, res) => {
    // get shop name from url
    getshopname(`${req.originalUrl.slice(18)}`).then((ret)=>{
        shopfunc.getShop(db, ret).then((obj) => {
            if (typeof obj == 'object'){
                res.send(obj.products);
            } else {
                res.send(obj);
            }
        }).catch((err) => {
            res.send(err);
        });
    }).catch((rej) => {
        res.send(rej);
    });
    
});



/*

Order related routing

*/


const orderSchema = joi.object().keys({
    shopname: joi.string().required(),
    orderID: joi.string().required()
});


//add an order
app.post('/api/add_order', (req, res) => {
    let validated = joi.validate(req.body, orderSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;

    let query = {
        id: body.orderID,
        totalprice: 0,
        lineitems: {}
    }

    orderfunc.addOrder(db, body.shopname, body.orderID, query).then((ret) => {
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});


// delete an order
app.post('/api/delete_order', (req, res) => {
    let validated = joi.validate(req.body, orderSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;
    orderfunc.deleteOrder(db, body.shopname, body.orderID).then((ret) => {
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});


// get all orders
app.get('/api/get_orders/*', (req, res) => {
    getshopname(`${req.originalUrl.slice(16)}`).then((ret)=>{
        shopfunc.getShop(db, ret).then((obj) => {
            if (typeof obj == 'object'){
                res.send(obj.orders);
            } else {
                res.send(obj);
            }
        }).catch((err) => {
            res.send(err);
        });
    }).catch((rej) => {
        res.send(rej);
    });
});





/*

Line Item related routing 

*/

const lineitemSchema = joi.object().keys({
    shopname: joi.string().required(),
    productname: joi.string().required(),
    orderID: joi.string(),
    quantity: joi.number().required(),
    detail: joi.string().required()
});

const deleteLineitemSchema = joi.object().keys({
    shopname: joi.string().required(),
    productname: joi.string().required(),
    orderID: joi.string(),
    detail: joi.string().required()
});

// add new line item

app.post('/api/add_lineitem', (req, res) => {
    let validated = joi.validate(req.body, lineitemSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;

    let query = {
        productname: body.productname,
        quantity: body.quantity,
        detail: body.detail
    }

    //check to see if line item should be added to orders or to products
    // if orderID is included, then line item will be deleted from order
    if (typeof body.orderID == 'string'){
        lineitemfunc.addToOrder(db, body.shopname, body.orderID, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        lineitemfunc.addToProduct(db, body.shopname, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    }
});


// delete line item
app.post('/api/remove_lineitem', (req, res) => {
    let validated = joi.validate(req.body, deleteLineitemSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    let body = validated.value;

    let query = {
        productname: body.productname,
        detail: body.detail
    }

    // check to delete form orders or products

    if (typeof body.orderID == 'string'){
        lineitemfunc.removeFromOrder(db, body.shopname, body.orderID, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        lineitemfunc.removeFromProduct(db, body.shopname, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    }
});




