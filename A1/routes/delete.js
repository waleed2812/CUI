var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const dbUrl = require('../constants/global').dbUrl;

const Person = require('../constants/People');

/* GET users listing. */
router.use('/', function(req, res, next) {

    mongoose.connect(dbUrl, function (err, db) {

        if (err) {
            db.close();
            throw err;
        }
    
        Person.findByIdAndDelete({_id: req.query.id}, (err)=>{
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
    