const express = require('express'),
    path = require('path'),
    glob = require('glob'),
    http = require('http'),
    cors = require('cors'),
    helmet = require('helmet'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    winston = require('./config/winston'),
    expressListners = require('./config/expressListners'),
    app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use('/public/img', express.static('public/img'))

// Enable CORS 
let corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    let allowedOrigins = [
        'http://localhost:3100',
        'http://localhost:4200',
        'http://192.168.1.73:4200',
        'http://192.168.1.73:3100',
        'http://domainName.com',
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

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

logger.token('remote-user', (req, res) => {
    if (req.user) {
        if (req.user.uid) {
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


require('./config/config')((err) => {
    if (err) {
        winston.error(err);
    } else {
        // Create HTTP server
        global.server = http.createServer(app);
        global.server.listen(global.config.PORT);
        global.server.on('error', expressListners.onError);
        global.server.on('listening', expressListners.onListening);
        app.use(express.static(path.join(__dirname, 'public')));

        app.use(cors(corsOptionsDelegate));

        app.use(helmet());
        app.use(cookieParser());

        var passport = require('./config/passport');
        app.use(passport.initialize());
        app.use(passport.session());

        global.errors = require('./config/errors');

        let webUserRoutes = 'app/modules/**/*.routes.js';

        glob.sync(webUserRoutes).forEach((file) => {
            require('./' + file)(app, '');
            winston.info(file + ' file is loaded in system');
        });

        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        app.use(async (err, req, res, next) => {
            winston.error(err);
            if (err) {
                let errorCode = err.msgCode;
                res.status(err.status || 500);
                return res.json({
                    success: 0,
                    message: (err.message) ? err.message : (err.msg) ? err.msg : global.errors[errorCode],
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
    }
});