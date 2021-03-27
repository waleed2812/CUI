const express = require('express');
let router = express.Router();

const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/A1';

const Person = require('../constants/People');

/* GET home page. */
router.get('/', function(req, res, next) {

  mongoose.connect(dbUrl, function (err, db) {
    
    if (err) {
      db.close();
      throw err;
    }

    // Typing all fields for find
    // Typing them in regular expression so similar results also show up
    // /[\s\S]*/i finds all item in db if no input is given by user

    Person.find({
      'name.firstName': {$regex: new RegExp(req.query.fname) || /[\s\S]*/i},

      'name.lastName': {$regex: new RegExp(req.query.lname) ||  /[\s\S]*/i},
      
      age: Number.parseInt(req.query.age) || {$gt: 0},
      
      email: {$regex: new RegExp(req.query.email) ||  /[\s\S]*/i},
    
      'bio.summary': {$regex: new RegExp(req.query.bio, "i") || /[\s\S]*/i},

    }).exec(function(err, persons) {
      if (err) {
        db.close();
        throw err;
      }

      res.render('index', {
        persons: persons, // Sending the information for table
        // Sending back the filter text to re-fill the filter inputs
        fname: req.query.fname || '',
        lname: req.query.lname || '',
        email: req.query.email || '',
        age: req.query.age || 0,
        bio: req.query.bio || '',
      });

      db.close();
    });
    
  });
});

module.exports = router;
