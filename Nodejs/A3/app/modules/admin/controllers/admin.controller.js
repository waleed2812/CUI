const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts'),
    bcrypt = require('bcryptjs');

// Assignment 3
// Dashboard
const getAdminDashboard= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'getAdminDashboard',
        data:{}
    })
};
// Class List
const getClasses= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'getClasses',
        data:{}
    })
};
// Add New Class
const addClass= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'addClass',
        data:{}
    })
};
// Add New Teacher
const addTeacher= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'addTeacher',
        data:{}
    })
};
// Add New Student
const addStudent= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'addStudent',
        data:{}
    })
};
// Assign Teacher to Class
const assignTeacher= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'assignTeacher',
        data:{}
    })
};
// Add student to Class
const assignStudent= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'assignStudent',
        data:{}
    })
};
// Modify Class
const updateClass= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'updateClass',
        data:{}
    })
};
// Delete Class
const deleteClass= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'deleteClass',
        data:{}
    })
};
// Delete Teacher
const deleteTeacher= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'deleteTeacher',
        data:{}
    })
};
// Delete Student
const deleteStudent= async function (req, res, next){
    return res.json({
        status: 0,
        messsage: 'deleteStudent',
        data:{}
    })
};


module.exports = {
    getAdminDashboard,
    getClasses,
    addClass,
    addTeacher,
    addStudent,
    assignTeacher,
    assignStudent,
    updateClass,
    deleteClass,
    deleteTeacher,
    deleteStudent
}