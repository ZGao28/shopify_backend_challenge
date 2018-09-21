module.exports = {
    addProduct: async function (db, shopname, query) {
        await db.collection('shops').updateOne({name: shopname}, {$push: {products: query}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully added product to ${shopname}`);
        });
        return 'SUCCESS';
    },

    deleteProduct: async function (db, shopname, productname) {
        await db.collection('shops').updateOne({name: shopname}, {$pull: {products: {name: productname}}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully deleted ${productname} from ${shopname}`);
        });
        return 'SUCCESS';
    },

    editProduct: async function (db, shopname, productname, query) {
        await db.collection('shops').updateOne({name: shopname}, {$pull: {products: {name: productname}}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
        });

        await db.collection('shops').updateOne({name: shopname}, {$push: {products: query}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
        });
        console.log(`Successfully edited ${productname} in ${shopname}`);
        return 'SUCCESS';
    }

}
