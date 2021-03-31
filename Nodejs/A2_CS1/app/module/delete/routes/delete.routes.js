const deleteController = require('../controllers/delete.controller');

module.exports = (app, version) => {
    app.get('/delete', deleteController.deleteFunction);
}