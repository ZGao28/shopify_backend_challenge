const express = require('express')
const relations = require('./Objects')
const Shop = relations.Shop;
const Product = relations.Product;
const Order = relations.Order;
const LineItem = relations.LineItem;
const app = express();

let Apple = new Shop();

let testdata = {Apple}

app.get('/', function (req, res) {
    res.send(testdata.Apple.products);
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))