'use strict'; 

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'), 
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

const schema = mongoose.Schema; 

let userAccount = new schema ({
    email: {type: String, default: ''},
    name: {type: String, default: '', required: true},
    profileImage: { type: String, default: '' },
    userType: {type: String, required: true, enum: ['student', 'teacher', 'head', 'admin']},
    phoneNumber: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    password: { type: String }
}); 

userAccount.plugin(mongoose_timestamps);
userAccount.index( {email: 1}, {background: true, unique: true, name: 'IDX_USERNAME'});
userAccount.index({ phoneNumber: 1 }, { unique: true, name: 'IDX_USERPHONE'}); 

userAccount.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        
        if (err) return cb(err);

        cb(null, isMatch);
    });

}

userAccount.pre('save', async function (next) {

    try {

        let user = this;
        console.log('this: ', this);

        // only hash the password if it has been modified or is new
        if (!user.isModified('password')) return next();

        // generate a salt
        let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        console.log('Password Salt', salt);

        console.log('typeof user.password',typeof this.password)

        let hash = await bcrypt.hash(this.password, salt);
        console.log('Password hash: ', hash);

        // override clear text password with hashed one        
        user.password = hash;

    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model('userAccounts', userAccount);



























