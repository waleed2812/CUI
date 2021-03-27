
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/my_db';

MongoClient.connect( url, { useNewUrlParser: true }, (err, db) => {

    let obj = {reg: 123, name:'Waleed Butt'};

    let obj1 = { $set: {reg: 170, name:'Waleed Butt'} };

    let my_db = db.db('my_db');

    my_db.collection('people').updateOne(obj, obj1, function (err, res){

        if (err) console.error("Error in update\n" + err);

        console.log(res);
    });

    let myquery = { name: /^S/ };

    let newvalues = {$set: {name: "Minnie"} };

    my_db.collection("people").updateMany(myquery, newvalues, function(err, res) {
        if (err) throw err;

        console.log(res);
    });

    db.close();
});