let indexFunction = async (req, res, next) => {
    res.json({
        status: 1,
        message: 'LMS Server is running.',
        data: {},
    });
};

let errorFunction = async (req, res, next) => {
    res.json({
        status: 1,
        message: 'Something went wrong on Server side.',
        data: {},
    });
};


module.exports = {
    indexFunction,
    errorFunction,
};