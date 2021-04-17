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
    }

});

// app.use(express.static(path.join(__dirname, 'public')));

// let webRoutes = 'app/module/**/*.routes.js';

// glob.sync(webRoutes).forEach((file) => {
//     require('./' + file)(app, '');
//     console.log(file + ' is loaded');
// });