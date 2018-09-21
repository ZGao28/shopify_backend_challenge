module.exports = {
    addOrder: async function (db, shopname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            await db.collection('shops').updateOne({name: shopname}, {$push: {orders: query}}, (err, res) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log(`Successfully added order to ${shopname}`);
            });
        }
        return `Successfully added order to ${shopname}`;
    },

    deleteOrder: async function (db, shopname, orderID) {
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