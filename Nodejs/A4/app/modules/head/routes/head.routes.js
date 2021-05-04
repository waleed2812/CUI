const headController = require('../controllers/head.controller');

module.exports = (app, version) => {
    // Assignment 3
    app.get(version + '/head', headController.head);
    app.get(version + '/head/class', headController.getClass);
    app.get(version + '/head/results/class/:id', headController.resultsClass);
    app.get(version + '/head/results/student/:id', headController.resultsStd);
    app.get(version + '/head/materials', headController.materials);
    app.get(version + '/head/graph', headController.graph);
}