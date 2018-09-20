// porting in and initializing modules
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const shopfunc = require('./shop');
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

Shop modification routing!

*/

// Post request for creating empty shop, must have key of store name
// No option to load products or orders until after shop is created
app.post('/api/create_shop', (req, res) => {

    //check to see if shopname exists and is string
    if (req.body.shopname && typeof req.body.shopname == 'string') {
        let descrip = '';
        
        //check to see if there is a description for shop, else leave blank
        if (req.body.description && typeof req.body.description == 'string'){
            descrip = req.body.description;
        }

        //create shop object
        let temp = {
            name: req.body.shopname,
            description: descrip,
            products: {},
            orders: {}
        }

        // Insert shop object into collection and return status
        shopfunc.createShop(db, temp).then((ret)=>{
            res.send(ret);
        }).catch((rej)=>{
            res.send(rej);
        });
    } else {
        res.send('Invalid create shop request! Make sure the JSON object has a property of "shopname" \n');
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
    if (req.body.shopname && typeof req.body.shopname == 'string' && req.body.newname && typeof req.body.newname == 'string') {
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
    if (req.body.shopname && typeof req.body.shopname == 'string' && req.body.description && typeof req.body.description == 'string') {
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

app.get('')



