const adminController = require('../controllers/admin.controller');

module.exports = function(app, version) {
    // Assignment 3

    app.get(version + '/admin', adminController.getAdminDashboard);
    app.get(version + '/admin/classes', adminController.getClasses);

    app.post(version + '/admin/addteacher', adminController.addTeacher);
    app.post(version + '/admin/addstudent', adminController.addStudent);
    app.post(version + '/admin/addclass', adminController.addClass);

    app.put(version + '/admin/class/:id', adminController.updateClass);
    app.put(version + '/admin/assignteacher/:id', adminController.assignTeacher);
    app.put(version + '/admin/assignstudent/:id', adminController.assignStudent);

    app.delete(version + '/admin/class/:id', adminController.deleteClass);
    app.delete(version + '/admin/teacher/:id', adminController.deleteTeacher);
    app.delete(version + '/admin/student/:id', adminController.deleteStudent);
}