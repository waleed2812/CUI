const usersController = require('../controllers/user.controller');

module.exports = (app, version) => {
    app.get(version + '/user', usersController.userFunction);
    app.get(version + '/user/errors', usersController.errorFunction);
}