const winston = require('../../../../config/winston'),
    passport = require('../../../../config/passport'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts');

let getUserListing = async (req, res, next) => {
    try {
        let filters = {};

        let usersListing = await userAccountModel.find(filters);
        let totalRecords = await userAccountModel.countDocuments(filters);

        return res.json({
            success: 1,
            message: 'User Listing fetched successfully.',
            data: {
                users: usersListing,
                totalRecords: totalRecords
            }
        });
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

let getUserDetail = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        let filters = { _id: userId };

        let userDetail = await userAccountModel.findOne(filters);
        if (userDetail) {
            return res.json({
                success: 1,
                message: 'User Listing fetched successfully.',
                data: {
                    userDetail: userDetail,
                }
            });
        } else {
            return res.json({
                success: 0,
                message: 'User does not exist.',
                data: {}
            });
        }
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

let updateUserInfo = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const name = req.body.name;
        const profileImage = req.body.profileImage;

        await userAccountModel.updateOne({ _id: userId }, { $set: { name: name, profileImage: profileImage } });

        return res.json({
            success: 1,
            message: 'User detail updated successfully.',
            data: {}
        });

    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

let deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        await userAccountModel.deleteOne({ _id: userId });

        return res.json({
            success: 1,
            message: 'User deleted successfully.',
            data: {}
        });
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

let createUser = async (req, res, next) => {
    try {
        const name = req.body.name || "";
        const profileImage = req.body.profileImage || "";
        const email = req.body.email;
        const password = req.body.password;
        const userType = req.body.userType || "admin";

        new userAccountModel({
                email: email,
                name: name,
                profileImage: profileImage,
                password: password,
                userType: userType
            })
            .save((err) => {
                if (err) {
                    winston.error(err);
                    return next({ msgCode: 100 });
                } else {
                    return res.json({
                        success: 1,
                        message: 'User created successfully.',
                        data: {}
                    });
                }
            });
    } catch (err) {
        winston.error(err);
        return next({ msgCode: 100 });
    }
};

let logInUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(info);
        }

        let userObject = user.toJSON();
        delete userObject.password;

        req.logIn(userObject, (err) => {
            if (err) {
                winston.error(err);
                return next({ msgCode: 5051 });
            }
            return next();
        });
    })(req, res, next);
};

let sendSingInSuccess = async (req, res, next) => {

    const token = jwt.sign(req.user, config.session.secret);

    return res.json({
        success: 1,
        message: 'User signIn successfully.',
        data: {
            user: req.user,
            token: token
        }
    });
};

let sendCurrentUser = (req, res, next) => {
    return res.json({
        success: 1,
        message: 'User signIn successfully.',
        data: {
            user: req.user
        }
    });
};

let userProfileImage = async (req, res, next) => {

    await userAccountModel.updateOne({ _id: req.user._id }, {
        $set: {
            profileImage: '/uploads/' + req.file.filename
        }
    });

    return res.json({
        success: 1,
        message: 'User signIn successfully.',
        data: {
            file: req.file,
            imageUrl: '/uploads/' + req.file.filename,
        }
    });
};

module.exports = {
    getUserListing,
    getUserDetail,
    updateUserInfo,
    deleteUser,
    createUser,
    logInUser,
    sendSingInSuccess,
    sendCurrentUser,
    userProfileImage,
};