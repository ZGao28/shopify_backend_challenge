// porting in and initializing modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const joi = require('joi');

// database interfacing functions
const shopfunc = require('./repos/shop');
const productfunc = require('./repos/product');
const orderfunc = require('./repos/order');

// Express setup stuff
let db;
app.use(express.static(__dirname + '/static-pages/'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to mongo and start the app on port 3500
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Error Connecting to Database \n'); 
        return err;
    }
    // Use db shopify
    db = client.db('shopify');
    app.listen(3500, () => {console.log('listening on PORT 3500!')});
});




/* 

Shop routing

*/

// Define shop schema

const shopSchema = joi.object().keys({
    shopname: joi.string().required(),
    description: joi.string().required(), 
});

// Post request for creating empty shop, must have key of store name and description
// No option to load products or orders until after shop is created
app.post('/api/create_shop', (req, res) => {

    let validated = joi.validate(req.body, shopSchema);
    if (validated.error != null) {
        throw new Error(validated.error.message);
    }
    
    let body = validated.value;
    
    //create shop object
    let query = {
            name: req.body.shopname,
            description: descrip,
            products: [],
            orders: []
        }

        // Insert shop object into collection and return status
        shopfunc.createShop(db, temp).then((ret)=>{
            res.send(ret);
        }).catch((rej)=>{
            res.send(rej);
        });
    } 
});

// Post request to remove shop
app.post('/api/remove_shop', (req, res) => {
    
    // Check to make sure request has proper info
    if (req.body.shopname && typeof req.body.shopname == 'string') {
        // Delete all occurences of shops with that name, send back status
        // (reallistically it would be better here to make it delete by shop name and location)
        shopfunc.deleteShop(db, req.body.shopname).then((ret)=>{
            res.send(ret);
        }).catch((rej)=>{
            res.send(rej);
        });
    } else {
        res.send('Invalid delete shop request! Make sure the JSON object has a property of "shopname" \n')
    }
});



// Post request to edit shop name
app.post('/api/update_shop_name', (req, res) => {
    
    // Check to make sure request has proper info
    if (typeof req.body.shopname == 'string' && typeof req.body.newname == 'string') {
        // change shop name while keeping rest of object info same
        shopfunc.updateShopName(db, req.body.shopname, req.body.newname).then((ret)=>{
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        res.send('Invalid update shop request! Make sure the JSON object has a property of "shopname" and "newname" \n')
    }
});

// Post request to edit shop description
app.post('/api/update_shop_description', (req, res) => {
    
    // Check to make sure request has proper info
    if (typeof req.body.shopname == 'string' && typeof req.body.description == 'string') {
        // change shop name while keeping rest of object info same
        shopfunc.updateShopDescription(db, req.body.shopname, req.body.description).then((ret)=>{
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        res.send('Invalid update shop request! Make sure the JSON object has a property of "shopname" and "description" \n')
    }
});



// Get request to return shop data
app.get('/api/get_shop/*', (req, res) => {
    // get the shop name by slicing it from the end of the route url
    let temp_shop_name = `${req.originalUrl.slice(14)}`;
    shopfunc.getShop(db, temp_shop_name).then((ret)=>{
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
        console.log('lol');
    });
});





/* 

Product related routing!

*/

//adding a product

app.post('/api/add_product', (req, res) => {
    if (typeof req.body.productname == 'string' && typeof req.body.price == 'number' && typeof req.body.shopname == 'string') {
        let query = {
            name: req.body.productname,
            price: req.body.price,
            lineitems: req.body.lineitems
        }
        productfunc.addProduct(db, req.body.shopname, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        res.send('Invalid product addition - make sure to have proper "shopname", "productname" and "price" set');
    }
});


// edit a product from a store

app.post('/api/edit_product', (req, res) => {
    if (typeof req.body.productname == 'string' && typeof req.body.price == 'number' && typeof req.body.shopname == 'string') {
        let query = {
            name: req.body.productname,
            price: req.body.price,
            lineitems: req.body.lineitems
        }
        productfunc.editProduct(db, req.body.shopname, req.body.productname, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        res.send('Invalid product edit - make sure to have proper "shopname", "productname" and "price" set');
    }
});


// Deleting a product from a store

app.post('/api/delete_product', (req, res) => {
    if (typeof req.body.productname == 'string' && typeof req.body.shopname == 'string') {
        productfunc.deleteProduct(db, req.body.shopname, req.body.productname).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        res.send('Invalid product addition - make sure to have proper "shopname" and "productname" set');
    }
});


// This is to get all products from a shop

app.get('/api/get_products/*', (req, res) => {
    let temp_shop_name = `${req.originalUrl.slice(18)}`;
    shopfunc.getShop(db, temp_shop_name).then((ret) => {
        if (typeof ret == 'object'){

            // the commented out stuff below would be to get a specific product, bit
            // was not needed for the front end stuff so i just didnt include
            /*
            for (let i = 0; i < ret.products.length; i++){
                if (ret.products[i].name == req.body.productname) {
                    res.send(ret.products[i]);
                }
            }
            */
            res.send(ret.products);
        } else {
            res.send(ret);
        }
    }).catch((rej) => {
        res.send(rej);
    });
});



/*

Order related routing

*/


//add an order

app.post('/api/add_order', (req, res) => {
    if (typeof req.body.id == 'string' && req.body.lineitems.length >= 1 && typeof req.body.shopname == 'string') {
        let query = {
            id: req.body.id,
            price: req.body.price,
            lineitems: req.body.lineitems
        }
        productfunc.addProduct(db, req.body.shopname, query).then((ret) => {
            res.send(ret);
        }).catch((rej) => {
            res.send(rej);
        });
    } else {
        res.send('Invalid product addition - make sure to have proper "shopname", "productname" and "price" set');
    }
});