let userFunction = (req, res, next) => {
    
    res.render('users/users', {
        userName: req.query.name || undefined
    });
};

module.exports = {
    userFunction,
}