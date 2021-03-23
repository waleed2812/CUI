const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
   _id: mongoose.SchemaTypes.ObjectId,
   name: {
      firstName: String,
      lastName: String
   },
   biography: String,
   twitter: String,
   facebook: String,
   linkedin: String,
   profilePicture: Buffer,
   created: {
      type: Date,
      default: Date.now
   }
});

const bookSchema = mongoose.Schema({
    title:String,
    author: mongoose.Schema.Types.ObjectId,
    ratings: [{summary: String}],
});

const Author = mongoose.model('author', authorSchema);
const Book = mongoose.model('book', bookSchema);


mongoose.connect('mongodb://localhost:27017/lec9mongoose', function (err, db) {

    if (err) throw err;

    console.log('Successfully connected');

    const jamieAuthor = new Author ({
        _id: new mongoose.Types.ObjectId(),
            name: {
            firstName: 'Jamie',
            lastName: 'Munro'
        },
        biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
        twitter: 'https://twitter.com/endyourif',
        facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
    });

    const mvcBook = new Book ({
        _id: new mongoose.Types.ObjectId(),
        title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
        author: jamieAuthor._id,
        ratings:[{
            summary: 'Great read'
        }]
    });

    const knockoutBook = new Book ({
        _id: new mongoose.Types.ObjectId(),
        title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
        author: jamieAuthor._id
    });

    jamieAuthor.save( (err) => {

        if (err) {

            db.close();

            console.error("Failed to Save Author");

            throw err;
        }

        console.log('Author successfully saved.');

        mvcBook.save(function(err) {
            if (err) {

                db.close();

                console.error("Failed MVC Book saved");

                throw err;
            }

            console.log('MVC Book successfully saved.');

            knockoutBook.save(function(err) {
                if (err) {

                    db.close();

                    console.error("Failed Knockout Book saved");

                    throw err;
                }

                console.log('Knockout Book successfully saved.');

                db.close();
            });
        });
    });

});

















