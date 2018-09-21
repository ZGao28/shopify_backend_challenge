module.exports = {
    addToProduct: async function (db, shopname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            for (let i = 0; i < curr.products.length; i++){
                if (curr.products[i].name == query.productname){
                    await db.collection('shops').updateOne({name: shopname}, {$push: {orders: {}}}, (err, res) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                        console.log(`Successfully added product to ${query.productname}`);
                    });
                }
            }
            
        }
        return `Successfully added lineitem to ${query.productname}`;
    },

    addToProduct: async function (db, shopname, orderID) {
        await db.collection('shops').updateOne({name: shopname}, {$pull: {orders: {id: orderID}}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully deleted ${orderID} from ${shopname}`);
        });
        return `Successfully deleted ${orderID} from ${shopname}`;
    }
}