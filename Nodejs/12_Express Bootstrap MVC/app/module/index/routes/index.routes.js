const indexController = require('../controllers/index.controller');

module.exports = (app, weblink) => {

    app.get('/', indexController.indexFunction);
};