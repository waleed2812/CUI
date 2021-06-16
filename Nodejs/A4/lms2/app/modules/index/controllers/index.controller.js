let indexMainFunction = (req, res, next) => {
    return res.json({
        message: 'LMS Server is Running.'
    });
};

let errorFunction = (req, res, next) => {
    return res.json({
        message: 'Something went wrong on server side.'
    });
};

module.exports = {
    indexMainFunction,
    errorFunction,
};