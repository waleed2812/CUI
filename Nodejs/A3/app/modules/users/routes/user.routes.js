const usersController = require('../controllers/user.controller');

module.exports = (app, version) => {
    app.get(version + '/users', usersController.getUserListing);
    app.get(version + '/userDetail/:userID', usersController.getUserDetail);
    app.post(version + '/userUpdate/:userID', usersController.updateUserInfo);
    app.delete(version + '/user/:userID', usersController.deleteUser);
    app.post(version + '/user/create', usersController.createUser);
    // Assignment 3
    app.post(version + '/user/login', usersController.loginUser);
    app.get(version + '/user/logout', usersController.logoutUser);
    app.get(version + '/user/validate/', usersController.validateUser);
}