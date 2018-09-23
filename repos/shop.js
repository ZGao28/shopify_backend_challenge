// All the exported functions for making edits to shops in database

module.exports = {

    // get shop function
    getShop: async function (db, shopname){
        let shop = await db.collection('shops').findOne({name: shopname});
        if (shop == null){
            return `No shop with name ${shopname} found! `;
        } else {
            return shop;
        }
    },

    //get all function

    getAll: async function (db){
        let shop = await db.collection('shops').find({}).toArray();
        if (shop == null){
            return `No shop with name ${shopname} found! `;
        } else {
            return shop;
        }
    }, 

    // create shop
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


    // delete shop
    deleteShop: async function (db, shopname){
        let temp = await db.collection('shops').findOne({name: shopname});
        
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

    // updating shop info
    updateShop: async function (db, shop){
        let temp = await db.collection('shops').findOne({name: shop.name});
        
        // make sure shop exists
        if (temp != null) {
            await db.collection('shops').updateOne({name: shop.name}, {$set: {name: shop.newname, description: shop.description}}, (err, res) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                console.log(`Successfully updated!`);
            });
            return `Successfully updated to ${shop.newname}! \n`;
        } else {
            return `${shop.name} not found! \n`;
        }
    }
}
