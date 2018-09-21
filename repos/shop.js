// All the exported functions for making edits to shops in database

module.exports = {
    getShop: async function (db, shopname){
        let shop = await db.collection('shops').findOne({name: shopname});
        if (shop == null){
            return `No shop with name ${shopname} found!`;
        } else {
            return shop;
        }
    },

    createShop: async function (db, shop){

        // Check to make sure the shop doesn't already exist
        let temp = await db.collection('shops').findOne({name: shop.name});

        if (temp == null){
            // since none with that name exists, add to db
            await db.collection('shops').insertOne(shop, (err, res) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log(`Added the store ${shop.name}`);
            });
            return `Shop with name ${shop.name} successfully added! \n`; 
        } else {
            // if it does exist, return that it already exists
            return `Shop with name ${shop.name} already exists! \n`;
        }   
    },

    deleteShop: async function (db, shopname){
        let temp = await db.collection('shops').findOne({name: shop.name});
        
        if (temp != null) {
            await db.collection('shops').deleteOne({name: shopname}, (err, res) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log(`Successfully removed all shops with name of ${shopname}`);
            });
            return `Shop with name ${shop.name} deleted \n`;
        } else {
            return `Shop with name ${shop.name} does not exist! \n`;
        }

        
    },

    updateShop: async function (db, shop){
        await db.collection('shops').updateOne({name: shop.name}, {$set: {name: shop.newname, description: shop.description}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully updated!`);
        });
        return 'SUCCESS';
    }
}
