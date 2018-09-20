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
        await db.collection('shops').insertOne(shop, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Added the store ${shop.name}`);
        });

        return 'SUCCESS';        
    },

    deleteShop: async function (db, shopname){
        await db.collection('shops').deleteMany({name: shopname}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully removed all shops with name of ${shopname}`);
        });

        return `SUCCESS`;
    },

    updateShopName: async function (db, oldname, newname){
        await db.collection('shops').updateOne({name: oldname}, {$set: {name: newname}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully updated ${oldname} to ${newname}!`);
        });
        return 'SUCCESS';
    },

    updateShopDescription: async function (db, shopname, desc){
        await db.collection('shops').updateOne({name: shopname}, {$set: {description: desc}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(`Successfully updated ${shopname} with description of '${desc}!'`);
        });
        return 'SUCCESS';
    }
}
