const glob  = require('glob'),
    _ = require('lodash'),
    fs = require('fs'),
    winston = require('./winston'),
    routePath = 'app/modules/**/*.error.json';

winston.info('error messages are loading...');


//initialize with common error objects
let errorObject = {

    '1': {
        'msh': {
            'EN' : "User Does Not Exist"
        }
    },
    '2': {
        'msh': {
            'EN' : "Incorrect Password"
        }
    },
    '3': {
        'msh': {
            'EN' : "User is not authenticated"
        }
    },
    '4': {
        'msh': {
            'EN' : "User is not authorized to visit the api"
        }
    }
}

glob.sync(routePath).forEach( file => {
    const errorFile = fs.readFileSync(file, 'utf-8');
    if (errorFile.length >= 10) {
        _.extend(errorObject, JSON.parse(errorFile));
        winston.info(file + ' is loaded');
    }
});

module.exports = errorObject;