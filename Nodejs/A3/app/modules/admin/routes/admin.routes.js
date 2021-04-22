const adminController = require('../controllers/admin.controller');

module.exports = (app, version) => {
    // Assignment 3
    // Dashboard
    app.get(version + '/admin', adminController.getAdminDashboard);
    // Class List
    app.get(version + '/admin/classes', adminController.getClasses);
    // Add New Class
    app.post(version + '/admin/add/class', adminController.addClass);
    // Add New Teacher
    app.post(version + '/admin/add/teacher', adminController.addTeacher);
    // Add New Student
    app.post(version + '/admin/add/student', adminController.addStudent);
    // Assign Teacher to Class
    app.post(version + '/admin/assign/teacher:ID', adminController.assignTeacher);
    // Add student to Class
    app.post(version + '/admin/assign/student:ID', adminController.assignStudent);
    // Modify Class
    app.post(version + '/admin/update/class:ID', adminController.updateClass);
    // Delete Class
    app.delete(version + '/admin/class:ID', adminController.deleteClass);
    // Delete Teacher
    app.delete(version + '/admin/teacher:ID', adminController.deleteTeacher);
    // Delete Student
    app.delete(version + '/admin/student:ID', adminController.deleteStudent);
}