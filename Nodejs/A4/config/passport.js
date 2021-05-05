var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    userAccount = mongoose.model('userAccount');

// Local Login Strategy
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
}, function(username, password, done) {
    userAccount.findOne({ userName: username }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Invalid UserName provided' });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Invalid Password Provided' });
            }
            return done(null, user);
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, { _id: user._id, userType: user.userType });
});

passport.deserializeUser(function(user, done) {
   userAccount .findById(user._id, function(err, user) {
        if (user) {
            done(err, user);
        } else {
            return done({ message: 'Unable to find user.' });
        }
    });
});

// passport middlewares
passport.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return next({ msgCode: 3 });
};

passport.isAuthorized = function(userType) {
    return function(req, res, next) {
        if (req.user.userType == userType) {
            return next();
        }
        return next({ message: 'User is authorized to access this api.' });
    };
};

module.exports = passport;