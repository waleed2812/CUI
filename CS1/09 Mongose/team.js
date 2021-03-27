const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
   name: { type: String, required: true}
});

const EmployeeSchema = new Schema({
   name: {
      first: { type: String, required: true},
      last: { type: String, required: true}
   },
   team: {  type: Schema.Types.ObjectId, ref: 'Team'},
   image: { type: String, default: 'images/user.png' },
   address: {
      lines: { type: [String] },
      postal: { type: String }
   }
});

const Team = mongoose.model('Team', TeamSchema);

mongoose.connect('mongodb://localhost:27017/lec9mongoose', function (err, db) {

   if (err) {
      db.close();
      throw err;
   };

   console.log('Successfully connected');

   const Teams = [
      {name: 'Product Development'},
      {name: 'Dev Ops'},
      {name: 'Accounting'},
   ]

   Team.insertMany(Teams, (error, pd, devops, acc) => {

      if (error) console.error("Error");

      console.dir(pd);
      console.dir(devops);
      console.dir(acc);

   }).then(r => {
      process.exit();
      db.close();
   });
});
