const teacherController = require('../controllers/teacher.controller');

module.exports = (app, version) => {
    // Assignment 3

    app.get(version + '/teacher', teacherController.teacher);
    app.get(version + '/teacher/viewattquiz', teacherController.viewattquiz);
    app.get(version + '/teacher/quiz/:id', teacherController.quiz);
    app.get(version + '/teacher/viewattassign', teacherController.viewattassign);
    app.get(version + '/teacher/assign/:id', teacherController.assignment);
    app.get(version + '/teacher/materials', teacherController.materials);
    app.post(version + '/teacher/addquiz', teacherController.addquiz);
    app.post(version + '/teacher/addassign', teacherController.addassign);
    app.post(version + '/teacher/addmat', teacherController.addmat);
    app.post(version + '/teacher/addmarks', teacherController.addmarks);
    app.put(version + '/teacher/marks/:id', teacherController.marks);
    app.delete(version + '/teacher/quiz/:id', teacherController.deleteQuiz);
    app.delete(version + '/teacher/assignment/:id', teacherController.deleteAssignment);
    app.delete(version + '/teacher/material/:id', teacherController.deleteMaterial);
    app.delete(version + '/teacher/marks/:id', teacherController.deleteMarks);
}