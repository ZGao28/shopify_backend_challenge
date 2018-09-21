module.exports = {
    addProduct: async function (db, shopname, productname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            if (productname in curr.products){
                return `Product with name ${productname} is already in the store! \n`;
            } else {
                curr.products[productname] = query;
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully added product to ${shopname}`);
                });
                return `Successfully added product to ${shopname} \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist!`;
        }
    },

    deleteProduct: async function (db, shopname, productname) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            if (productname in curr.products){
                return `Product with name ${productname} is already in the store! \n`;
            } else {
                curr.products[productname] = query;
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully added product to ${shopname}`);
                });
                return `Successfully added product to ${shopname} \n`;
            }
        }
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
        return `Successfully edited ${productname} in ${shopname}`;
    }

}
