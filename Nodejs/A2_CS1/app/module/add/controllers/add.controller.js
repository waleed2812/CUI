const express = require('express');
let router = express.Router();
const path = require('path');
const appDir = path.dirname(require.main.filename);

const mongoose = require('mongoose');

const dbUrl = require(appDir+'/app/constants/global').dbUrl;

const User = require(appDir+'/app/constants/User');


let addFunction = (req, res, next) => {

    if (JSON.stringify(req.query).length <= 2) {
        res.render('add/add', {saved: 'no data'});
        return ;
    }

    // Create new person instance to add to db
    const newUser = new User({
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
        // Save New User
        newUser.save((err)=>{
            if (err) {
                db.close();
                throw err;
            }
            db.close();
            res.render('add/add', {saved: 'saved'});
        });
    });
};

module.exports = {
    addFunction,
}