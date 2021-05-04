const express = require('express'),
    path = require('path'),
    glob = require('glob'),
    http = require('http'),
    logger = require('morgan'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    session = require('express-session'),
    mongoStore = require('connect-mongo'),
    expressListners = require('./config/expressListners'),
    winston = require('./config/winston');


const app = express();

// view Engine Setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

logger.token('remote-user', (req, res) => {
    if (req.user) {
        if (req.user._id) {
            return '{userId:' + req.user._id + '&name:' + req.user.name + '}';
        }
    } else {
        return 'Guest';
    }
});

logger.token('clientIP', (req, res) => {
    var clientIP = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;

    return clientIP;
});

app.use(logger(':date[iso] :clientIP :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Cor Implementation
let corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let allowedOrigins = [
        'http://localhost:3200',
    ];
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



require('./config/mongooseConnection')((err) => {
    if (err) {
        winston.error(err);
    } else {

        global.server = http.createServer(app);
        global.server.listen(global.config.PORT);
        global.server.on('error', expressListners.onError);
        global.server.on('listening', expressListners.onListening);

        app.use(cors(corsOptionsDelegate));
        app.use(helmet());
        app.use(cookieParser());

        console.log(config.session.secret);
        app.use(session({
            secret: config.session.secret,
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

        var passport = require('./config/passport');
        app.use(passport.initialize());
        app.use(passport.session());

        let webUserRoutes = 'app/modules/**/*.routes.js';
        glob.sync(webUserRoutes).forEach((file) => {
            require('./' + file)(app, '');
            winston.info(file + ' file is loaded in system');
        });

        global.errors = require('./config/errors');

        app.use(async (err, req, res, next) => {
            winston.error(err);
            if (err) {
                let errorCode = err.msgCode;
                res.status(err.status || 500);
                return res.json({
                    success: 0,
                    message: (err.message) ? err.message : global.errors[errorCode],
                    response: 200,
                    data: {}
                });
            } else {
                res.status(err.status || 500);
                return res.json({
                    success: 0,
                    message: 'Something went wrong on server Side',
                    response: 200,
                    data: {}
                });
            }
        });

        // catch 404 and forward to error handler
        // app.use((req, res, next) => {
        //     var err = new Error('Not Found');
        //     err.status = 404;
        //     next(err);
        // });

    }
});