
const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/my_db';

MongoClient.connect( url, { useNewUrlParser: true }, (err, db) => {

    let dbo = db.db('my_db');

    // dbo.orders.aggregate([
    //     { $match: { status: "A" } },
    //     { $group: { _id: "$cust_id",
    //             total: { $sum: "$amount" } } },
    //     { $sort: { total: -1 } }
    // ]);

    dbo.collection("people").find().limit(5).toArray(function(err, result) {
        if (err) throw err;
        console.log('Limit');
        console.log(result);
    });

    dbo.collection('orders').aggregate(
        [ {
            $lookup:{
                from:'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'orderdetails'
            }}]).toArray(
                function(err, res) {

                    if (err) throw err;
                    console.log(JSON.stringify(res));
                });

        db.close();
});