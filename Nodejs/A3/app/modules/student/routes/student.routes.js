const studentController = require('../controllers/student.controller');

module.exports = (app, version) => {
    // Assignment 3

    app.get(version + '/student', studentController.getstudentDashboard);
    app.get(version + '/attemptquiz', studentController.attemptQuiz);
    app.get(version + '/viewassignment', studentController.viewAssignment);
    app.get(version + '/material', studentController.getMaterials);
    app.get(version + '/material/:id', studentController.getMaterial);
    app.get(version + '/result', studentController.getResults);
    app.get(version + '/result/:subid', studentController.getResult);

    app.post(version + '/viewquiz', studentController.viewQuiz);
    app.post(version + '/submitassignment', studentController.submitAssignment);
    
}