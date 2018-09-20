// All the exported functions for making edits to shops in database

module.exports = {
    getShop: async function (db, shop_name){
        let shop = await db.collection('shops').findOne({name: shop_name});
        if (shop == null){
            return `No shop with name ${shop_name} found!`;
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
            console.log('Added the store ' + shop.name + ' \n');
        });

        return 'Added the store ' + shop.name + ' \n';        
    },

    deleteShop: async function (db, shop_name){
        await db.collection('shops').deleteMany({name: shop_name}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
            console.log('Successfully removed all shops with name of ' + shop_name + ' \n');
        });

        return `${shop_name} shop deleted! \n`;
    },

    updateShopName: async function (db, oldname, newname){
        await db.collection('shops').updateOne({name: oldname}, {$set: {name: newname}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
        });
        return 'Successfully Updated! \n';
    },

    updateShopDescription: async function (db, shopname, desc){
        await db.collection('shops').updateOne({name: shopname}, {$set: {description: desc}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
        });
        return 'Successfully Updated! \n';
    }
}
