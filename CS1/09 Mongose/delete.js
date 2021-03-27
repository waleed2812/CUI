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

const Author = mongoose.model('author', authorSchema);

mongoose.connect('mongodb://localhost:27017/lec9mongoose', function (err, db) {

    Author.deleteOne({biography: /Jamie/i}, (err) => {

        if (err) {
            db.close();
            throw err;
        }

        console.log("Deleted");
        db.close();
    });
});