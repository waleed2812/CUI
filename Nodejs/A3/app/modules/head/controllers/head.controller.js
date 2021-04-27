const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccount = mongoose.model('userAccount'),
    Class = mongoose.model('Class'),
    bcrypt = require('bcryptjs');

// Assignment 3


const head = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'head',
        data: {}
    });
}

const getClass = async function(req, res, next) {
    const classes = await Class.find({});

    if (!classes) {
        return next({msgCode: 15});
    }
    return res.json({
        status: 0,
        messsage: 'Class Lists Available',
        data:{classes}
    });
}

const resultsClass = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'resultsClass',
        data: {}
    });
}
const resultsStd = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'resultsStd',
        data: {}
    });
}
const materials = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'materials',
        data: {}
    });
}
const graph = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'graph',
        data: {}
    });
}



module.exports = {
    head,
    getClass,
    resultsClass,
    resultsStd,
    materials,
    graph
}