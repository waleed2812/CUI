const studentController = require('../controllers/student.controller');

module.exports = function(app, version) {
    // Assignment 3
    app.get(version + '/student', studentController.getstudentDashboard);
    app.get(version + '/student/attemptquiz', studentController.attemptQuiz);
    app.get(version + '/student/viewassignment', studentController.viewAssignment);
    app.get(version + '/student/material', studentController.getMaterials);
    app.get(version + '/student/material/:id', studentController.getMaterial);
    app.get(version + '/student/result', studentController.getResults);
    app.get(version + '/student/result/:subid', studentController.getResult);
    app.post(version + '/student/viewquiz', studentController.viewQuiz);
    app.post(version + '/student/submitassignment', studentController.submitAssignment);
    
}