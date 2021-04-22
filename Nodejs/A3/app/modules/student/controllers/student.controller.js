const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts'),
    bcrypt = require('bcryptjs');

// Assignment 3

const getstudentDashboard = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "getstudentDashboard",
        data: {}
    })
}
const attemptQuiz = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "attemptQuiz",
        data: {}
    })
}
const viewAssignment = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "viewAssignment",
        data: {}
    })
}
const getMaterials = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "getMaterials",
        data: {}
    })
}
const getMaterial = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "getMaterial",
        data: {}
    })
}
const getResults = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "getResults",
        data: {}
    })
}
const getResult = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "getResult",
        data: {}
    })
}

const viewQuiz = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "viewQuiz",
        data: {}
    })
}
const submitAssignment = async function(req, res, next) {
    return res.json({
        status: 0,
        message: "submitAssignment",
        data: {}
    })
}

module.exports = {
    getstudentDashboard,
    attemptQuiz,
    viewAssignment,
    getMaterials,
    getMaterial,
    getResults,
    getResult,
    viewQuiz,
    submitAssignment
}