
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/my_db';

MongoClient.connect( url, { useNewUrlParser: true }, (err, db) => {

    if (err) throw err;

    console.log("Database created!");

    let my_db = db.db('my_db');

    let obj = {reg: 123, name:'Waleed Butt'};

    let obj2 = [
        {reg: 161, name:'Talha Ejaz'},
        {reg: 162, name:'Tanzeel Khan'},
        {reg: 151, name:'Shrek'},
        {reg: 159, name:'Tani'},
        {reg: 164, name:'Umar Khalid'}
    ];

    my_db.collection('people').insertOne(obj, function (err, res){

        if (err) console.error(err);

        console.log(res);
    });

    my_db.collection('people').insertMany(obj2, function (err, res){

        if (err) console.error(err);

        console.log(res);
    });



    db.close();
});