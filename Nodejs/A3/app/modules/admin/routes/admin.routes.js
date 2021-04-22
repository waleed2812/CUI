const adminController = require('../controllers/admin.controller');

module.exports = (app, version) => {
    // Assignment 3

    app.get(version + '/admin', adminController.getAdminDashboard);
    app.get(version + '/classes', adminController.getClasses);

    app.post(version + '/addteacher', adminController.addTeacher);
    app.post(version + '/addstudent', adminController.addStudent);
    app.post(version + '/addclass', adminController.addClass);

    app.put(version + '/class/:id', adminController.updateClass);
    app.put(version + '/assignteacher/:id', adminController.assignTeacher);
    app.put(version + '/assignstudent/:id', adminController.assignStudent);

    app.delete(version + '/class/:id', adminController.deleteClass);
    app.delete(version + '/teacher/:id', adminController.deleteTeacher);
    app.delete(version + '/student/:id', adminController.deleteStudent);
}