const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts'),
    bcrypt = require('bcryptjs');

// Assignment 3
const teacher = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'teacher',
        data: {}
    });
}
const viewattquiz = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'viewattquiz',
        data: {}
    });
}
const quiz = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'quiz',
        data: {}
    });
}
const viewattassign = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'viewattassign',
        data: {}
    });
}
const assignment = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'assignment',
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
const addquiz = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'addquiz',
        data: {}
    });
}
const addassign = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'addassign',
        data: {}
    });
}
const addmat = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'addmat',
        data: {}
    });
}
const addmarks = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'addmarks',
        data: {}
    });
}
const marks = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'marks',
        data: {}
    });
}
const deleteQuiz = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'deleteQuiz',
        data: {}
    });
}
const deleteAssignment = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'deleteAssignment',
        data: {}
    });
}
const deleteMaterial = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'deleteMaterial',
        data: {}
    });
}
const deleteMarks = async function(req, res, next) {
    return res.json({
        status: 0,
        message: 'deleteMarks',
        data: {}
    });
}


module.exports = {
    teacher,
    viewattquiz,
    quiz,
    viewattassign,
    assignment,
    materials,
    addquiz,
    addassign,
    addmat,
    addmarks,
    marks,
    deleteQuiz,
    deleteAssignment,
    deleteMaterial,
    deleteMarks,

}