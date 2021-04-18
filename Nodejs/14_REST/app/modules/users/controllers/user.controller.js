const userFunction = async (req, res, next) => {
    
    res.json({
        status: 0,
        messsage: 'User View',
        data:{}
    });
};

const errorFunction = async (req, res, next) => {
    
    res.json({
        status: 0,
        messsage: 'Error in User Routes',
        data:{}
    });
};

module.exports = {
    userFunction,
    errorFunction,
}