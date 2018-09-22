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
            return `Shop with ${shopname} does not exist! \n`;
        }
    },

    deleteProduct: async function (db, shopname, productname) {
        let curr = await db.collection('shops').findOne({name: shopname});
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

    editProduct: async function (db, shopname, productname, query) {
        let curr = await db.collection('shops').findOne({name: shopname});
        if (curr != null){
            if (productname in curr.products){
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
