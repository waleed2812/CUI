const express = require('express'),
    path = require('path'),
    glob = require('glob'),
    http = require('http'),
    logger = require('morgan'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    session = require('express-session'),
    mongoStore = require('connect-mongo'),
    expressListeners = require('./config/expressListeners'),
    winston = require('./config/winston'),
    app = express();


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Some Global Constants
global.constants = {}

logger.token('remote-user', function(req, res){
    if (req.user) {
        if (req.user._id) {
            return '{userId: ' + req.user._id + '&name:' + req.user.name + '}';
        }
    } else {
        return 'Guest';
    }
});

logger.token('clientIP', function(req, res){
    
    return (req.headers['x-forwarded-for'] || '').split(',')[0] || 
        req.socket.remoteAddress;
});

app.use(logger(':date[iso] :clientIP :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Cor Implementation
let corsOptionsDelegate = function(req, callback) {
    let corsOptions;
    const uri = global.config.Method + '://' + global.config.IP + ':' + global.config.PORT;
    let allowedOrigins = [uri];
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            credentials: true,
            origin: true
        };
    } else {
        corsOptions = {
            origin: false
        };
    }
    callback(null, corsOptions);
};


require('./config/mongooseConnection')(function(err) {

    if (err) {
        winston.error;
    }

    else {
        // Setting up server
        global.server = http.createServer(app);
        global.server.listen(global.config.PORT);
        global.server.on('error', expressListeners.onError);
        global.server.on('listening', expressListeners.onListening);

        app.use(cors(corsOptionsDelegate));
        app.use(helmet());
        app.use(cookieParser());

        app.use(session({
            secret: global.config.session.secret,
            store: mongoStore.create({
                mongoUrl: config.mongodb.host,
                touchAfter: 14 * 24 * 60 * 60, // time period in seconds,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
            }),
            resave: true,
            saveUninitialized: true,
            clearExpired: true,
            checkExpirationInterval: 900000,
            cookie: {
                maxAge: 60 * 24 * 3600 * 1000,
            }
        }));

        const webRoutes = 'app/modules/**/*.routes.js';        
        winston.info('Routes are loading...');
        glob.sync(webRoutes).forEach(function(file) {
            require('./' + file)(app, '');
            winston.info(file + ' is loaded');
        });

        global.errors = require('./config/errors');

        app.use( async function(err, req, res, next) {
            winston.error(JSON.stringify(err));
            res.status(err.status || 500);
                
            if (err && err.hasOwnProperty('msgCode')) {
                return res.json({
                    success: 0,
                    message: (err.message) ? err.message : global.errors[err.msgCode],
                    response: 200,
                    data: {}
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Unhandeled Error',
                    response: 200,
                    data: {}
                });
            }
        });

        const passport = require('./config/passport');
        app.use(passport.initialize());
        app.use(passport.session());

        //catch 404 and forward to error handler
        app.use( function(err, req, res, next) {
            err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }
});