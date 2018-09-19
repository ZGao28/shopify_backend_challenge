// porting in and initializing modules
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
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
    db = client.db('shopify');
    app.listen(3500, () => {console.log('listening on PORT 3500!')});
});

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
        createShop(temp).then((ret)=>{
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
        deleteShop(req.body.shopname).then((ret)=>{
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
        updateShopName(req.body.shopname, req.body.newname).then((ret)=>{
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
        updateShopDescription(req.body.shopname, req.body.description).then((ret)=>{
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
    getShop(temp_shop_name).then((ret)=>{
        res.send(ret);
    }).catch((rej) => {
        res.send(rej);
    });
});




async function getShop(shop_name){
    let shop = await db.collection('shops').findOne({name: shop_name});
    if (shop == null){
        return `No shop with name ${shop_name} found!`;
    } else {
        return shop;
    }
}

async function createShop(shop){
    await db.collection('shops').insertOne(shop, (err, res) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log('Added the store ' + shop.name + ' \n');
    });

    return 'Added the store ' + shop.name + ' \n';        
}

async function deleteShop(shop_name){
    await db.collection('shops').deleteMany({name: shop_name}, (err, res) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log('Successfully removed all shops with name of ' + shop_name + ' \n');
    });

    return `${shop_name} shop deleted! \n`;
}

async function updateShopName(oldname, newname){
    await db.collection('shops').updateOne({name: oldname}, {$set: {name: newname}}, (err, res) => {
        if (err) {
            console.log(err);
            return err;
        }
    });
    return 'Successfully Updated! \n';
}

async function updateShopDescription(shopname, desc){
    await db.collection('shops').updateOne({name: shopname}, {$set: {description: desc}}, (err, res) => {
        if (err) {
            console.log(err);
            return err;
        }
    });
    return 'Successfully Updated! \n';
}