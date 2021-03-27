var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const dbUrl = require('../constants/global').dbUrl;

const Person = require('../constants/People');

/* GET users listing. */
router.use('/', function(req, res, next) {
  
  // Create new person instance to add to db
  const newPerson = new Person({
    name:{
      firstName: req.query.fname,
      lastName: req.query.lname
    },
    age: req.query.age,
    email: req.query.email,
    bio: [{summary: req.query.bio}],
  });
  
  mongoose.connect(dbUrl, function (err, db) {

    if (err) {
        db.close();
        throw err;
    }

    // Save New Person
    newPerson.save((err)=>{
        if (err) {
            db.close();
            throw err;
        }
        db.close();
        res.redirect('/');
    });
  });

});

module.exports = router;
