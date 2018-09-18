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
app.post('/api/create_store', (req, res) => {

    //check to see if shopname exists and is string
    if (req.body.shopname && typeof req.body.shopname == 'string') {
        let descrip = '';
        
        //check to see if there is a description for shop, else leave blank
        if (req.body.description && typeof req.body.description == 'string'){
            descrip = req.body.description;
        }

        //create shop object
        let temp = {
            name: req.body['storename'],
            description: descrip,
            products: {},
            orders: {}
        }

        //insert shop object into collection
        db.collection('shops').insertOne(temp, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log('Added the store ' + req.body['storename']);
        });

        //return success
        res.send('Added the store ' + req.body['storename'] + ' \n');
    } else {
        res.send('Invalid create shop request! Make sure the JSON object has a property of "storename"');
    }
});

// Post request to remove shop
app.post('/api/remove_shop', (req, res) => {
    console.log(req.body);
    db.collection('shops').insertOne(req.body, () => {console.log('Added Successfully!')});
    res.redirect('/');
});

app.post('/api/removeItem', (req, res) => {
    console.log(req.body);
    db.collection('shops').deleteOne({'store': req.body['store']}, () => {console.log('Removed Successfully!')});
    res.redirect('/');
});