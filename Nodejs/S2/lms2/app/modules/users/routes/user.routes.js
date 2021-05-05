const userController = require('../controllers/user.controller'),
    passport = require('../../../../config/passport');

module.exports = (app, version) => {

    app.get(version + '/users',
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        userController.getUserListing
    );

    app.get(version + '/users/:userId',
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        userController.getUserDetail);

    app.post(version + '/users/:userId',
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        userController.updateUserInfo);

    app.delete(version + '/users/:userId',
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        userController.deleteUser);

    app.post(version + '/user/create',
        passport.isAuthenticated,
        passport.isAuthorized('admin'),
        userController.createUser);

    // user SignIn 

    app.post(version + '/user/signIn',
        userController.logInUser,
        userController.sendSingInSuccess,
    );
};