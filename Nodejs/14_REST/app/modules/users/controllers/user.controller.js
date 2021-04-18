const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    userAccountModel = mongoose.model('userAccounts');

const getUserListing = async (req, res, next) => {
    
    try {

        // For Pagination
        const offset = (req.query.offset) ? parseInt(req.query.offset) : 0,
            limit = (req.query.limit) ? parseInt(req.query.offset) : 20;

        const filters = {};

        const userListing = await userAccountModel.find(filters).skip(offset).limit(limit).lean();
        const totalRecords = await userAccountModel.countDocuments(filters);
        
        
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
        res.redirect('/error');
    }
};

const getUserDetail = async (req, res, next) => {
        
    try {

        // For Pagination
        const userID = req.params.userID;

        const filters = {_id: userID};
        
        const userDetail = await userAccountModel.findOne(filters);
        if(userDetail) {
            return res.json({
                status: 0,
                messsage: 'User Listing Fetched Successfully',
                data:{
                    usersDetail: userDetail
                }
            });
        } else {
            return res.json({
                status: 1,
                messsage: 'User Does Not Exist',
                data:{}
            });
        }
        

    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

const updateUserInfo = async (req, res, next) => {
    
    try {

        const userID = req.params.userID;

        const name = req.body.name;
        const profileImage = req.body.profileImage;
        
        await userAccountModel.updateOne({_id: userID}, {$set: {name: name, profileImage: profileImage}});

        return res.json({
            status: 0,
            messsage: 'User Details Updated',
            data:{}
        });
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await userAccountModel.deleteOne({_id: req.params.userID});
        return res.json({
            status: 0,
            messsage: 'User Deleted',
            data:{}
        });
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

const createUser = async (req, res, next) => {
    
    try {

        const name = req.body.name;
        const profileImage = req.body.profileImage;
        const email = req.body.email;
        const password = req.body.password;
        
        new userAccountModel({name: name, profileImage: profileImage, email: email, password: password})
            .save( err => {

                if (err) return res.redirect('/error');

                return res.json({
                    status: 0,
                    messsage: 'User Created Successfully',
                    data:{}
                });
            });
            
    } catch (err) {
        winston.error(err);
        res.redirect('/error');
    }
};

module.exports = {
    getUserListing,
    getUserDetail,
    updateUserInfo,
    deleteUser,
    createUser
}