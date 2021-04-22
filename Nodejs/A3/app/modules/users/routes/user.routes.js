const usersController = require('../controllers/user.controller');

module.exports = (app, version) => {
    app.get(version + '/users', usersController.getUserListing);
    app.get(version + '/users/:userID', usersController.getUserDetail);
    app.post(version + '/users/:userID', usersController.updateUserInfo);
    app.delete(version + '/users/:userID', usersController.deleteUser);
    app.post(version + '/user/create', usersController.createUser);
    // Assignment 3
    app.post(version + '/login', usersController.loginUser);
    app.get(version + '/logout', usersController.logoutUser);
    app.get(version + '/validate', usersController.validateUser);
}