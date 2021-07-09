const asyncLib = require('async'),
    path = require('path'),
    glob = require('glob'),
    mongoose = require('mongoose'),
    winston = require('./winston'),
    env = process.env.NODE_ENV || 'development';

global.config = {};

module.exports = function(callback) {
    asyncLib.series([
            (envCb) => {
                glob('config/env/*.json', function(err, files) {
                    if (err) {
                        return envCb(err);
                    } else {
                        global.config = require(path.join(__dirname, 'env', env + '.js'));
                        if (!global.config) {
                            return envCb('Error occurred while loading configuration File.');
                        } else {
                            winston.info('Loaded Config File: ' + env);

                            if (!mongoose.connection.readyState) {
                                mongoose.connect(global.config.mongodb.host, {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true,
                                    useCreateIndex: true
                                });
                            } else {
                                return envCb();
                            }

                            // when successfully connected
                            mongoose.connection.on('connected', function() {
                                winston.info('mongoose connection open');
                                // Enabling mongoose debug mode if required
                                mongoose.set('debug', global.config.mongodb.enableMongoDebugging);
                                return envCb();
                            });

                            // if the connection throws an error
                            mongoose.connection.on('error', function(err) {
                                //   if you get error for the first time when this gets started make sure to run mongod 
                                return envCb(err);
                            });

                            // when the connection is disconnected
                            mongoose.connection.on('disconnected', function() {
                                return envCb('mongoose connection disconnected');
                            });

                        }
                    }
                });
            },
            (modelsCb) => {
                // load all models
                glob('app/modules/**/*.model.js', (err, files) => {
                    if (err) {
                        return modelsCb(err);
                    } else {
                        winston.info('models are loading ...');
                        files.forEach(function(file) {
                            require(path.join(__dirname, '../', file));
                            winston.info(file, 'is loaded');
                        });
                        return modelsCb();
                    }
                });
            }
        ],
        function(err) {
            if (err) {
                return callback(err);
            } else {
                callback();
            }
        }

    );
};