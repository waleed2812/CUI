const addController = require('../controllers/add.controller');

module.exports = (app, version) => {
    app.get('/add', addController.addFunction);
}