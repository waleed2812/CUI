
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

MongoClient.connect(url,function(err, db) {
    if (err) throw err;

    const dbo = db.db("my_db");

    dbo.collection("people").findOne({}, function(err, result) {

        if (err) throw err;

        console.log(result.name);
    });

    dbo.collection("people").find({}).toArray(function(err, result) {

        if (err) throw err;

        console.log(result);
    });

    dbo.collection("people").find({},{ projection: { _id:0, name:1, address:1} }).toArray(
        function(err, result) {
            if (err) throw err;
            console.log(result);

    });

    const mysort = { reg: 1 };

    dbo.collection("people").find().sort(mysort).toArray(function(err, result) {

        if (err) throw err;

        console.log(result);
    });

    db.close();
});
