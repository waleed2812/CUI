const express = require('express');
let router = express.Router();
const path = require('path');
const appDir = path.dirname(require.main.filename);

const mongoose = require('mongoose');

const dbUrl = require(appDir+'/app/constants/global').dbUrl;

const User = require(appDir+'/app/constants/User');


let deleteFunction = (req, res, next) => {
    mongoose.connect(dbUrl, function (err, db) {

        if (err) {
            db.close();
            throw err;
        }
    
        User.findByIdAndDelete({_id: req.query.id}, (err)=>{
            if (err) {
                db.close();
                throw err;
            }
            db.close();
            res.redirect('/users');
        });
    });
};

module.exports = {
    deleteFunction,
}