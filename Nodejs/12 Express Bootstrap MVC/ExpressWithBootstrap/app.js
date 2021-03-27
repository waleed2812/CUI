const express = require('express'),
    chalk = require('chalk'),
    path = require('path'),
    glob = require('glob'),
    http = require('http');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

const server = http.createServer(app);
const port = '3001';
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.use(express.static(path.join(__dirname, 'public')));

let webRoutes = 'app/module/**/*.routes.js';

glob.sync(webRoutes).forEach((file) => {
    require('./' + file)(app, '');
    console.log(file + ' is loaded');
});


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(chalk.bold.green('Server is listening on', bind));
}