const winston = require('./winston'),
    chalk = require('chalk');


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = (typeof port === 'string') ? 'Pipe ' + global.config.PORT : 'Port ' + global.config.PORT;

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
    const addr = global.server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(chalk.bold.green('Server is listening on', bind));
}

module.exports = {
    onError,
    onListening,

};