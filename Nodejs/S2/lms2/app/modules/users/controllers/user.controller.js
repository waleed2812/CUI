const winston = require('../../../../config/winston'),
    passport = require('../../../../config/passport'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts');

let getUserListing = async (req, res, next) => {
    try {
        let offset = (req.query.offset) ? parseInt(req.query.offset) : 0,
            limit = (req.query.limit) ? parseInt(req.query.limit) : 20;
        let filters = {};

        let usersListing = await userAccountModel.find(filters).skip(offset).limit(limit).lean();
        let totalRecords = await userAccountModel.countDocuments(filters);

        res.json({
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
                message: 'User Listing fetched successfully.',
                data: {
                    userDetail: userDetail,
                }
            });
        } else {
            return res.json({
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
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

let createUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;

        // await userAccountModel.create({ name: name, profileImage: profileImage });
        new userAccountModel({ email: email, name: name, profileImage: profileImage, password: password })
            .save((err) => {
                if (err) {
                    return res.redirect('/error');
                } else {
                    return res.json({
                        message: 'User created successfully.',
                        data: {}
                    });
                }
            });
    } catch (err) {
        winston.error(err);
        // res.redirect('/error');
        return next({ msgCode: 100 });
    }
};

let logInUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(info);
        }
        
        req.logIn(user, (err) => {
            if (err) {
                winston.error(err);
                return next({ msgCode: 5051 });
            }
            return next();
        });
    })(req, res, next);
};

let sendSingInSuccess = (req, res, next) => {
    return res.json({
        message: 'User signIn successfully.',
        data: {
            user: req.user
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
};