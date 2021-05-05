const winston = require('../../../../config/winston'),
    passport = require('../../../../config/passport'),
    mongoose = require('mongoose'),
    userAccount = mongoose.model('userAccount');

const getUserListing = async function(req, res, next) {
    
    try {

        // For Pagination
        const offset = (req.query.offset) ? parseInt(req.query.offset) : 0,
            limit = (req.query.limit) ? parseInt(req.query.offset) : 20;

        const filters = {};

        const userListing = await userAccount.find(filters).skip(offset).limit(limit).lean();
        const totalRecords = await userAccount.countDocuments(filters);
        
        
        res.json({
            status: 0,
            messsage: 'User Listing Fetched Successfully',
            data:{
                users: userListing,
                totalRecords: totalRecords
            }
        });

    } catch (err) {
        winston.error(err);
        next({msgCode: 10});
    }
};

const getUserDetail = async function(req, res, next) {
        
    try {

        // For Pagination
        const userID = req.params.userID;

        const filters = {_id: userID};
        
        const userDetail = await userAccount.findOne(filters);
        
        if(userDetail) {
            return res.json({
                status: 0,
                messsage: 'User Listing Fetched Successfully',
                data:{
                    usersDetail: userDetail
                }
            });
        } else {
            winston.error(err);
            return res.json({
                status: 1,
                messsage: 'User Does Not Exist',
                data:{}
            });
        }
        

    } catch (err) {
        winston.error(err);
        next({msgCode: 9});
    }
};

const updateUserInfo = async function(req, res, next) {
    
    try {

        const userID = req.params.userID;

        const name = req.body.name;
        const profileImage = req.body.profileImage;
        
        await userAccount.updateOne({_id: userID}, {$set: {name: name, profileImage: profileImage}});

        return res.json({
            status: 0,
            messsage: 'User Details Updated',
            data:{}
        });
    } catch (err) {
        winston.error(err);
        next({msgCode: 8});
    }
};

const deleteUser = async function(req, res, next) {
    try {
        await userAccount.deleteOne({_id: req.params.userID});
        return res.json({
            status: 0,
            messsage: 'User Deleted',
            data:{}
        });
    } catch (err) {
        winston.error(err);
        next({msgCode: 7});
    }
};

const createUser = async function(req, res, next) {
    
    try {


        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;
        const userType = req.body.userType;
        const phoneNumber = req.body.phoneNumber;

        const options = {
             name,
             profileImage,
             email,
             password,
             userType,
             phoneNumber

        }
        new userAccount(options)
            .save( function(err) {

                if (err) {
                    winston.error(err);
                    return next({msgCode: 5})
                };

                return res.json({
                    status: 0,
                    messsage: 'User Created Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }
};

const loginUser = async function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(info);
        }
        
        req.logIn(user, function(err) {
            if (err) {
                winston.error(err);
                return next({ msgCode: 5051 });
            }
            return next();
        });
    })(req, res, next);
};

const sendSingInSuccess = function (req, res, next) {
    return res.json({
        message: 'User signIn successfully.',
        data: {
            user: req.user
        }
    });
};

const logoutUser = async function(req, res, next) {
    return res.json({
        status: 0,
        messsage: 'Logout',
        data:{}
    })

} 

const validateUser = async function(req, res, next) {
    try {
        const username = req.query.username ;

        if (!username) return next({msgCode: 14})

        const query = {$or:[{email: username}, {phoneNumber: username}]};
        
        userAccount.findOne(query, function(err, user) {
            if (err) {
                winston.error(err);
                return next({msgCode: 11});
            }
            return res.json({
                status: 0,
                messsage: 'Valid User',
                data:{}
            });   
        });
    } catch (err) {
        winston.error(err);
        return next({msgCode: 6});
    }

} 

module.exports = {
    getUserListing,
    getUserDetail,
    updateUserInfo,
    deleteUser,
    createUser,
    loginUser,
    logoutUser,
    validateUser,
    sendSingInSuccess
}