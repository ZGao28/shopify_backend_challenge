const express = require('express')
const relations = require('./Objects')
const Shop = relations.Shop;
const Product = relations.Product;
const Order = relations.Order;
const LineItem = relations.LineItem;
const app = express();

let Adidas = new Shop();
let Porsche = new Shop();
let McDonalds = new Shop();

let testdata = {
    Adidas,
    Porsche,
    McDonalds
}

app.get('/', function (req, res) {
    res.send(testdata.Apple.products);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))