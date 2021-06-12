const winston = require('../../../../config/winston'),
    { check, validationResult } = require('express-validator');


let getValidationResult = async (message, req, res, next) => {

    const validationResults = await validationResult(req);

    if (!validationResults.isEmpty()) {
        let errors = validationResults.array();
        winston.error(message, errors[0].msg);
        return next(errors[0]);
    }
    return next();
};

let validateUserSignIn = async (req, res, next) => {
    await check('email').notEmpty().withMessage('Email is required').run(req);
    await check('password').notEmpty().withMessage('User password is required').run(req);

    return getValidationResult('SignIn Validation: ', req, res, next);
};

module.exports = {
    validateUserSignIn,
};