var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    // path = require('path'),
    userAccounts = mongoose.model('userAccounts');

// Local Login Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function(email, password, done) {
    userAccounts.findOne({ email: email }, {
        updatedAt: 0,
        createdAt: 0,
        __v: 0,
        // password: 0,
    }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Invalid UserName provided' });
        }
        user.comparePassword(password, (err, isMatch) => {
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

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.session.secret,
    passReqToCallback: true,
}, async (req, user, done) => {
    let accountFound = await userAccounts.findById(user._id);

    if (!accountFound) {
        return done({ message: 'Unable to find user.' });
    }
    return done(null, accountFound);
}));

passport.serializeUser((user, done) => {
    done(null, { _id: user._id, userType: user.userType });
});

passport.deserializeUser((user, done) => {
    userAccounts.findById(user._id, function(err, user) {
        if (user) {
            done(err, user);
        } else {
            return done({ message: 'Unable to find user.' });
        }
    });
});

// passport middlewares
passport.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return next({ message: 'User is not authenticated' });
};

passport.isAuthorized = (userType) => {
    return (req, res, next) => {
        if (req.user.userType == userType) {
            return next();
        }
        return next({ message: 'User is not authorized to access this api.' });
    };
};

module.exports = passport;