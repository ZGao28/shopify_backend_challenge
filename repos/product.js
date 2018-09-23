module.exports = {

    // add a product
    addProduct: async function (db, shopname, productname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});

        // make sure shop exists
        if (curr != null){
            // check to see if product is already in the store
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
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    // delete product
    deleteProduct: async function (db, shopname, productname) {
        let curr = await db.collection('shops').findOne({name: shopname});
        // check to see if product is in store
        if (curr != null){
            if (productname in curr.products){
                delete curr.products[productname];
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully deleted ${productname} from ${shopname}`);
                });
                return `Successfully deleted ${productname} from ${shopname} \n`;
            } else {
                return `Product ${productname} not exist in ${shopname} \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    //edit products

    editProduct: async function (db, shopname, productname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            if (productname in curr.products){
                // update products 
                delete curr.products[productname];
                curr.products[query.name] = query;
                await db.collection('shops').updateOne({name: shopname}, {$set: {products: curr.products}}, (err, res) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    console.log(`Successfully edited ${productname} from ${shopname}`);
                });
                return `Successfully edited ${productname} from ${shopname} \n`;
            } else {
                return `Product ${productname} not exist in ${shopname} \n`;
            }
        } else {
            return `Shop with ${shopname} does not exist! \n`;
        }
    }

}
