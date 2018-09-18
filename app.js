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
    db = client.db('shopify-challenge');
    app.listen(3500, () => {console.log('listening on PORT 3000!')});
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

        // Insert shop object into collection
        db.collection('shops').insertOne(temp, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log('Added the store ' + req.body.shopname + ' \n');
        });
        
        // Create index based on shop name for essentially O(1) lookup
        // it's actually log base 8126 but thats basically constant time look up
        db.collection('shops').createIndex({name: req.body.shopname});

        //return success
        res.send('Added the store ' + req.body.shopname + ' \n');
    } else {
        res.send('Invalid create shop request! Make sure the JSON object has a property of "shopname" \n');
    }
});

// Post request to remove shop
app.post('/api/remove_shop', (req, res) => {
    
    // Check to make sure request has proper info
    if (req.body.shopname && typeof req.body.shopname == 'string') {

        // Delete all occurences of shops with that name 
        // (reallistically it would be better here to make it delete by shop name and location)
        db.collection('shops').deleteMany({name: req.body.shopname}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log('Successfully removed all shops with name of ' + req.body.shopname + ' \n');
        });

        res.send('Shop deleted! \n');

    } else {
        res.send('Invalid delete shop request! Make sure the JSON object has a property of "shopname" \n')
    }
});



