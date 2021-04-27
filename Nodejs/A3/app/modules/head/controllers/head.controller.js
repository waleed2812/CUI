const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccount'),
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
    return res.json({
        status: 0,
        message: 'class',
        data: {}
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