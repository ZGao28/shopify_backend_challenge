module.exports = {
    // adding line item to product
    addToProduct: async function (db, shopname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});

        // make sure shop, product exists
        if (curr != null){
            let product = curr.products[query.productname];
            if (product != null){
                let lineitem = product.lineitems[`${query.detail}`];

                // if line item already exists, just increase the quantity, otherwise, add
                if (lineitem != null) {
                    lineitem.quantity = lineitem.quantity + query.quantity;
                } else {
                    // update price of line item with product price
                    query['price'] = product.price;
                    product.lineitems[`${query.detail}`] = query;
                }
                // insert
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully added/updated stock of line item ${query.detail} to ${query.productname}`);
                });

                return `Successfully added line item ${query.detail} to ${query.productname} \n`;
            } else {
                return `The product ${query.productname} does not exist! \n`
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },


    // adding line item to order
    addToOrder: async function (db, shopname, orderID, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            let order = curr.orders[orderID];
            let product = curr.products[query.productname];
            let lineitem = product.lineitems[`${query.detail}`];

            // make sure line item exists in products, and that there is enough stock
            if (order != null && lineitem != null && lineitem.quantity >= query.quantity){
                let orderlineitem = order.lineitems[`${query.productname}, ${query.detail}`];
                
                // check to see if line item already exists or not, add to quantity if it does
                if (orderlineitem != null) {
                    orderlineitem.quantity = orderlineitem.quantity + query.quantity;
                    order.totalprice = order.totalprice + product.price*query.quantity;
                } else {
                    query['price'] = product.price;
                    order.lineitems[`${query.productname}, ${query.detail}`] = query;
                    order.totalprice = order.totalprice + product.price*query.quantity;
                }

                // create a query to remove quantity from products line item
                let pquery = {
                    productname: query.productname,
                    quantity: query.quantity*-1,
                    detail: query.detail
                }
                
                // first remove stock from products
                await this.addToProduct(db, shopname, pquery);

                // insert
                await db.collection('shops').updateOne({name: shopname}, {$set: {orders: curr.orders}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully added line item ${query.productname}, ${query.detail} to order ${orderID}`);
                });

                return `Successfully added line item ${query.productname}, ${query.detail} to order ${orderID} \n`;
            } else {
                return `Please check to make sure that orderID is valid and product with specified line item detail exists \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    // removing from product
    removeFromProduct: async function (db, shopname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            let product = curr.products[query.productname];
            if (product.lineitems[`${query.detail}`] != null){
                delete product.lineitems[`${query.detail}`];
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully deleted line item ${query.detail} to ${query.productname}`);
                });

                return `Successfully deleted line item ${query.detail} from ${query.productname} \n`;
            } else {
                return `The line item ${query.productname}, ${query.detail} does not exist! \n`
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    // removing from order
    removeFromOrder: async function (db, shopname, orderID, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            let order = curr.orders[orderID];
            let product = curr.products[query.productname];
            if (order.lineitems[`${query.productname}, ${query.detail}`] != null && product.lineitems[`${query.detail}`] != null){
                order.totalprice = order.totalprice - product.price*order.lineitems[`${query.productname}, ${query.detail}`].quantity;
                
                // create a query to return line item stock to products
                let pquery = {
                    productname: query.productname,
                    quantity: order.lineitems[`${query.productname}, ${query.detail}`].quantity,
                    detail: query.detail
                }
                delete order.lineitems[`${query.productname}, ${query.detail}`];
                await this.addToProduct(db, shopname, pquery);
                await db.collection('shops').updateOne({name: shopname}, {$set: {orders: curr.orders}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully deleted line item ${query.productname}, ${query.detail} to order ${orderID}`);
                });
                
                return `Successfully deleted line item ${query.productname}, ${query.detail} from order ${orderID} \n`;
            } else {
                return `Please check to make sure that orderID is valid and product with specified line item detail exists \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    }
}