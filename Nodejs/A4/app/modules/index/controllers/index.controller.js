const indexFunction = async function(req, res, next) {

    return res.json({
        status: 1,
        message: 'LMS Server is Running',
        data: {},
    });

};

const errorFunction = async function(req, res, next) {

    return res.json({
        status: 1,
        message: 'Index Error',
        data: {},
    });

};


module.exports = {
    indexFunction,
    errorFunction,
};