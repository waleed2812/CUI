const userController = require('../controllers/user.controller'),
    userValidations = require('../middlewares/user.middlewares'),
    passport = require('../../../../config/passport'),
    multer = require('../../../../config/multer').upload();


module.exports = (app, version) => {

    app.post(
        version + '/user/login',
        userValidations.validateUserSignIn,
        userController.logInUser,
        userController.sendSingInSuccess,
    );

    app.get(
        version + '/user/current',
        passport.authenticate('jwt', { session: false }),
        userController.sendCurrentUser,
    );

    app.get(version + '/users',
        passport.authenticate('jwt', { session: false }),
        passport.isAuthorized('admin'),
        userController.getUserListing
    );

    app.get(version + '/users/:userId',
        passport.authenticate('jwt', { session: false }),
        passport.isAuthorized('admin'),
        userController.getUserDetail
    );

    app.post(version + '/users/:userId',
        passport.authenticate('jwt', { session: false }),
        passport.isAuthorized('admin'),
        userController.updateUserInfo
    );

    app.delete(version + '/users/:userId',
        passport.authenticate('jwt', { session: false }),
        passport.isAuthorized('admin'),
        userController.deleteUser
    );

    app.post(version + '/user/create',
        passport.authenticate('jwt', { session: false }),
        passport.isAuthorized('admin'),
        userController.createUser
    );

    app.post(version + '/user/profileImage',
        passport.authenticate('jwt', { session: false }),
        passport.isAuthorized('admin'),
        multer.single('image'),
        userController.userProfileImage,
    );
};