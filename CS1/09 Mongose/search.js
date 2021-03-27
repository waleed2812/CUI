const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:String,
    author: mongoose.Schema.Types.ObjectId,
    ratings: [{summary: String}],
});

const Book = mongoose.model('book', bookSchema);

mongoose.connect('mongodb://localhost:27017/lec9mongoose', function (err, db) {


    Book.find({
        title: /mvc/i
    }).sort('created')
        .limit(5)
        .exec(function(err, books) {
            if (err) {
                db.close();
                throw err;
            }

            console.log(books);


            Book.findOneAndUpdate({title: /my/i}, {title: 'Harry Potter'}, (err) => {
                if (err) {
                    db.close();
                    throw err;
                }

                console.log(books);
                db.close();
            });
        });
});