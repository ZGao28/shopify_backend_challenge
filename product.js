module.exports = {
    addProduct: async function (db, shopname, query) {
        let productname = query.name;
        await db.collection('shops').updateOne({name: shopname}, {$push: {products: query}}, (err, res) => {
            if (err) {
                console.log(err);
                return err;
            }
        });
        return 'Successfully Added Product! \n';
    }
}