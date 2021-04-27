const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccount = mongoose.model('userAccount'),
    Class = mongoose.model('Class')
    bcrypt = require('bcryptjs');

// Assignment 3

// Dashboard
const getAdminDashboard= async function (req, res, next){

    const users = await userAccount.find({});
    const classes = await Class.find({});

    if (!users || !classes) {
        return next({msgCode: 15});
    }
    return res.json({
        status: 0,
        messsage: 'Data for Admin Dashboard',
        data:{
            users,
            classes
        }
    })
};

// Class List
const getClasses= async function (req, res, next){
    const classes = await Class.find({});

    if (!classes) {
        return next({msgCode: 15});
    }
    return res.json({
        status: 0,
        messsage: 'Class Lists Available',
        data:{classes}
    });
};

// Add New Class
const addClass= async function (req, res, next){
    try {
        const course = req.body.course;
        const code = req.body.code;
        const room = req.body.room;

        const options = {
             course,
             code,
             room
        }
        new Class(options)
            .save( err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 17})
                };

                return res.json({
                    status: 0,
                    messsage: 'Class Added Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 17});
    }
};

// Add New Teacher
const addTeacher= async function (req, res, next){
    try {
        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;
        const userType = 'teacher';
        const phoneNumber = req.body.phoneNumber;

        const options = {
             name,
             profileImage,
             email,
             password,
             userType,
             phoneNumber

        }
        new userAccount(options)
            .save( err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 5})
                };

                return res.json({
                    status: 0,
                    messsage: 'User Created Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }
};

// Add New Student
const addStudent= async function (req, res, next){
    try {
        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;
        const userType = 'student';
        const phoneNumber = req.body.phoneNumber;

        const options = {
             name,
             profileImage,
             email,
             password,
             userType,
             phoneNumber

        }
        new userAccount(options)
            .save( err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 5})
                };

                return res.json({
                    status: 0,
                    messsage: 'User Created Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }
};
// Modify Class
const updateClass= async function (req, res, next){
    try {

        const classID = req.params.id || '';

        const classToUpdate = await Class.findOne({_id: classID});

        if (!classToUpdate) {
            const err = next({msgCode: 19})
            winston.error(err);
            return err
        }
        const course = req.body.course || classToUpdate.course;
        const code = req.body.code || classToUpdate.code;
        const room = req.body.room || classToUpdate.room;

        const options = {
             course,
             code,
             room
        }

        Class.findByIdAndUpdate(classID, options, 
            err => {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 18});
                };

                return res.json({
                    status: 0,
                    messsage: 'Class Updated Successfully',
                    data:{}
                });
            });

    } catch (err) {
        winston.error(err);
        return next({msgCode: 18})
    }
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