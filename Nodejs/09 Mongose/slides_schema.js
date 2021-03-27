const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lec9mongoose', function (err, db) {

   if (err) throw err;

   console.log('Successfully connected');
   
   db.close();
});

const Schema = mongoose.Schema;

// const blogSchema = new Schema({
//    title: String,
//    author: String,
//    body: String,
//    comments: [{ body: String, date: Date }],
//    date: { type: Date, default: Date.now },
//    hidden: Boolean,
//    meta: {
//       votes: Number,
//       favs:  Number
//    }
// });
//
// const child = new Schema({ name: String });
// const parent = new Schema({ name: String, age: Number, children: [child] });
// const Tree = mongoose.model('Tree', parent);
//
// // setting schema options
// new Schema({ name: String }, { _id: false, autoIndex: false })
// //_id=false will alow to eliminate _id field with each document
//
// const userSchema = mongoose.Schema({
//    name: {
//       firstName: String,
//       lastName: String
//    },
//    created: Date
// });
//
// const authorSchema = mongoose.Schema({
//    _id: mongoose.Schema.Types.ObjectId,
//    name: {
//       firstName: String,
//       lastName: String
//    },
//    biography: String,
//    twitter: String,
//    facebook: String,
//    linkedin: String,
//    profilePicture: Buffer,
//    created: {
//       type: Date,
//       default: Date.now
//    }
// });
//
// const TeamSchema = new Schema({
//    name: { type: String, required: true}
// });
//
// const EmployeeSchema = new Schema({
//    name: {
//       first: { type: String, required: true},
//       last: { type: String, required: true}
//    },
//    team: {  type: Schema.Types.ObjectId, ref: 'Team'},
//    image: { type: String, default: 'images/user.png' },
//    address: {
//       lines: { type: [String] },
//       postal: { type: String }
//    }
// });

const yourSchema = new Schema({
   title: String,
   capacity: Number,
   country: String,
   size: String,
});

const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' }); //instance of Model

small.save(function (err) {
   if (err) return handleError(err);
   // saved!
   return "Saved";
}); //OR

Tank.create({ size: 'small' }, function (err, small) {
   if (err) return handleError(err);
   // saved!
   return "Saved"
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {
});
