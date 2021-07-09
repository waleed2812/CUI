const adminController = require('../controllers/admin.controller'),
    multer = require('../../../../config/multer').upload();


module.exports = (app, version) => {

    app.get(version + '/admin',
        adminController.getCandidateListing
    );

    app.get(version + '/admin/jobs',
        adminController.getJobs
    );

    app.post(version + '/admin/add',
        adminController.addCandidate
    );
};