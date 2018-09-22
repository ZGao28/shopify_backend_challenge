module.exports = {
    addToProduct: async function (db, shopname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            let product = curr.products[query.productname];
            if (product != null){
                query['price'] = product.price;
                product.lineitems[`${query.detail}`] = query;
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully added line item ${query.detail} to ${query.productname}`);
                });

                return `Successfully added line item ${query.detail} to ${query.productname} \n`;
            } else {
                return `The product ${query.productname} does not exist! \n`
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    addToOrder: async function (db, shopname, orderID, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            let order = curr.orders[orderID];
            let product = curr.products[query.productname];
            if (order != null && product.lineitems[`${query.detail}`] != null){
                query['price'] = product.price;
                order.lineitems[`${query.productname}, ${query.detail}`] = query;
                order.totalprice = order.totalprice + product.price*query.quantity;
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


}