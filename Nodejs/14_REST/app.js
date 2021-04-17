const { response } = require('express');
const express = require('express'),
    path = require('path'),
    glob = require('glob'),
    http = require('http'),
    winston = require('./config/winston'),
    expressListeners = require('./config/expressListeners');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


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

        let webRoutes = 'app/module/**/*.routes.js';

        glob.sync(webRoutes).forEach((file) => {
            require('./' + file)(app, '');
            console.log(file + ' is loaded');
        });

        app.use( async (err, req, res, next) => {
            winston.error(err);
            res.status(err.status || 500);
                
            if (err & err.hasOwnProperty('msgCode')) {
                let errorCode = err.msgCode;
                return res.json({
                    success: 0,
                    message: global.errors(errorCode);
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

            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }
});