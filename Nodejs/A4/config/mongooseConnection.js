const asynLib = require('async') ,
    path = require('path') ,
    glob = require('glob') ,
    mongoose = require('mongoose'),
    winston = require('./winston'),
    env = process.env.NODE_ENV || ('development');
    
global.config = {}

module.exports = function(callback) {
    asynLib.series([
        (envCB) => {
            glob('config/env/*.json', (err, filer) => {
                
                if (err) {
                    return envCB(err);
                } else {
                    global.config = require(path.join(__dirname, 'env', env + '.json'));

                    if (!global.config) {
                        return envCB('Error occured while loading the configuration file.');
                    } else {

                        winston.info('Loaded Config File: ' + env);
                        winston.info('Try to Connect MongoDb: ' + global.config.mongodb.host);
                        
                        if (!mongoose.connection.readyState) {
                            mongoose.connect(global.config.mongodb.host, { 
                                useCreateIndex: true,
                                useUnifiedTopology: true,
                                useNewUrlParser: true
                            });

                            // when successfully connected
                            mongoose.connection.on('connected', function() { 
                                winston.info('mongoose connection open to ' + global.config.mongodb.host); 
                                // Enabling mongoose debug mode if required
                                mongoose.set('debug', global.config.mongodb.enableMongoDebugging);
                                return envCB();
                            }); 

                            // if the connection throws an error
                            mongoose.connection.on('error', function(err) {
                                // if you get error for the first time when this gets started make sure to run mongod
                                return envCB(err);
                            }); 

                            // when the connection is disconnected
                            mongoose.connection.on('disconnected', function() { 

                                return envCB('mongoose connection disconnected');
                            });

                        } else {
                            return envCB();
                        }
                    }
                }
            });
        },
        (modelsCB) => {
            // load all models
            glob('app/modules/**/*.model.js', (err, files) => {
                if (err) return modelsCB(err);

                else {
                    winston.info('models are loading...');
                    files.forEach( file => {
                        require(path.join(__dirname, '../', file));
                        winston.info(file, 'is loaded');
                    });
                }
                return modelsCB();
            });
        }
    ], function(err) {
        if (err){
            winston.error(err); 
            return callback(err); 
        }
        else {
            return callback();
        } 
    }); 
}; 
