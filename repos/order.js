module.exports = {
    // adding an order
    addOrder: async function (db, shopname, orderID, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        // check to see if shop exists
        if (curr != null){
            // check to see if orderID is already present
            if (orderID in curr.orders){
                return `order with id ${orderID} is already in the store! \n`;
            } else {
                // add order to orders: {}
                curr.orders[orderID] = query;
                await db.collection('shops').updateOne({name: shopname}, {$set: {orders: curr.orders}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully added order with orderID ${orderID} to ${shopname}`);
                });
                return `Successfully added order with orderID ${orderID} to ${shopname} \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    //deleting an order

    deleteOrder: async function (db, shopname, orderID) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            if (orderID in curr.orders){
                delete curr.orders[orderID];
                await db.collection('shops').updateOne({name: shopname}, {$set: {orders: curr.orders}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully deleted ${orderID} from ${shopname}`);
                });
                return `Successfully deleted ${orderID} from ${shopname} \n`;
            } else {
                return `order ${orderID} does not exist in ${shopname} \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },
}