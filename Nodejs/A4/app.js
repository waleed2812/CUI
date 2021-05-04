const express = require('express'),
    path = require('path'),
    glob = require('glob'),
    http = require('http'),
    logger = require('morgan'),
    winston = require('./config/winston'),
    expressListeners = require('./config/expressListeners');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

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
        req.connection.remoteAddress;
});

app.use(logger(':date[iso] :clientIP :remote-user :method :url HTTP/:http-version'+
    ' :status :res[content-length] - :response-time ms'));

require('./config/mongooseConnection')((err) => {

    if (err) {
        winston.error;
    }

    else {
        // Setting up server
        global.server = http.createServer(app);
        global.server.listen(global.config.PORT);
        global.server.on('error', expressListeners.onError);
        global.server.on('listening', expressListeners.onListening);

        app.use(express.static(path.join(__dirname, 'public')));

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));

        const webRoutes = 'app/modules/**/*.routes.js';

        glob.sync(webRoutes).forEach((file) => {
            require('./' + file)(app, '');
            console.log(file + ' is loaded');
        });

        global.errors = require('./config/errors');

        app.use( async (err, req, res, next) => {
            winston.error(err);
            res.status(err.status || 500);
                
            if (err && err.hasOwnProperty('msgCode')) {
                let errorCode = err.msgCode;
                return res.json({
                    success: 0,
                    message: global.errors[errorCode],
                    response: 200,
                    data: {}
                });
            } else {
                return res.json({
                    success: 0,
                    message: 'Something went wrong on server Side',
                    response: 200,
                    data: {}
                });
            }
        });

        //catch 404 and forward to error handler
        app.use((err, req, res, next) => {
            err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }
});