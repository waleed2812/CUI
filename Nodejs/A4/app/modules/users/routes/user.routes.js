const usersController = require('../controllers/user.controller'),
    passport = require('../../../../config/passport');

module.exports = (app, version) => {
    app.get(version + '/users', 
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        usersController.getUserListing
    );

    app.get(version + '/users/:userID', 
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        usersController.getUserDetail
    );

    app.post(version + '/users/:userID', 
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        usersController.updateUserInfo
    );

    app.delete(version + '/users/:userID', 
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        usersController.deleteUser
    );

    app.post(version + '/user/create',
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
         usersController.createUser
    );

    app.post(version + '/user/login',
        usersController.loginUser,
        usersController.sendSingInSuccess
    );

    app.get(version + '/user/logout', 
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        usersController.logoutUser
    );

    app.get(version + '/user/validate/', 
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        usersController.validateUser
    );

}