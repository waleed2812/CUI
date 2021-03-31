const usersController = require('../controllers/user.controller');

module.exports = (app, version) => {
    app.get('/users', usersController.userFunction);
}