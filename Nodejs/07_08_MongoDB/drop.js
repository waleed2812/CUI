
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err, db) {
    if (err) throw err;

    const dbo = db.db("my_db");

    dbo.collection("people").drop(function(err, obj) {
        if (err) throw err;
        console.log("Dropped People");
    });

    db.close();
});
