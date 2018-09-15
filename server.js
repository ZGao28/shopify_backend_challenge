var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
   
     if(err) throw err;

     //Write databse Insert/Update/Query code here..
     
     let dbo = db.db("MyDb");
     dbo.createCollection("customers", function(err, res) {
       if (err) throw err;
       console.log("Collection created!");
     });

     dbo.createCollection("customers", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
     });
});