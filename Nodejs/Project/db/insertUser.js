const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10,
    schema = mongoose.Schema;

let userAccount = new schema({
    email: { type: String, default: '' },
    name: { type: String, default: '', required: true },
    profileImage: { type: String, default: '' },
    userType: { type: String, required: true, enum: ['student', 'teacher', 'head', 'admin'] },
    phoneNumber: { type: String, default: '' },
    isBlocked: { type: Boolean, default: false },
    password: { type: String },
});

userAccount.plugin(mongoose_timestamps);
userAccount.index({ email: 1 }, { background: true, unique: true, name: 'IDX_EMAIL' });

userAccount.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userAccount.pre('save', async function(next) {
    try {
        var user = this;
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        console.log('Password Salt', salt);

        let hash = await bcrypt.hash(user.password, salt);
        console.log('Password Hash: ', hash);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});

const userAccountModel = mongoose.model('userAccounts', userAccount);

mongoose.connect("mongodb://localhost:27017/lms", function(err, db){

    if(err) {
        console.error("Failed to Connect Mongoose");
        console.error(err);
        db.close();
        return;
    }

    let users = [];
    const range = 10;

    for (let i = 1 ; i <= range ; i ++ ) {
        users.push({
            "name": "Test Admin" + i,
            "email": "testadmin" + i + "@domain.com",
            "profileImage": "" ,
            "userType": "admin",
            "phoneNumber": "+923456789101" + i,
            "password": "12345678!@",
        })
    }
    userAccountModel.insertMany(users,(err) => {
        if (err) {
            console.error(err);
            db.close();
            return;
        } else {
            console.log({
                success: 1,
                message: 'User created successfully.',
                data: {}
            });
            db.close();
            return;
        }
    });

    // new userAccountModel({
    //         "name": "Test Admin",
    //         "email": "testadmin@domain.com",
    //         "profileImage": "" ,
    //         "userType": "admin",
    //         "phoneNumber": "+9234567891010",
    //         "password": "12345678!@",
    // }).save((err) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     } else {
    //         console.log({
    //             success: 1,
    //             message: 'User created successfully.',
    //             data: {}
    //         });
    //         return;
    //     }
    // });
});