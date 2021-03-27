
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err, db) {
    if (err) throw err;

    const dbo = db.db("my_db");

    const myquery = { name: 'Waleed Butt' };

    dbo.collection("people").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });

    const myquery2 = { name: {$regex: /^T/} }; //Regular Expression

    dbo.collection("people").deleteMany(myquery2, function(err, obj) {

        if (err) throw err;

        console.log(obj.result.n + " document(s) deleted");
    });

    db.close();
});
