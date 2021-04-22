const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts'),
    bcrypt = require('bcryptjs');

// Assignment 3
// Dashboard
function getAdminDashboard(){};
// Class List
function getClasses(){};
// Add New Class
function addClass(){};
// Add New Teacher
function addTeacher(){};
// Add New Student
function addStudent(){};
// Assign Teacher to Class
function assignTeacher(){};
// Add student to Class
function assignStudent(){};
// Modify Class
function updateClass(){};
// Delete Class
function deleteClass(){};
// Delete Teacher
function deleteTeacher(){};
// Delete Student
function deleteStudent(){};


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