const mongoose = require('mongoose'),
    jobModel = require('./schema').jobModel,
    candidateAccount = require('./schema').candidateAccount;

mongoose.connect(`mongodb://localhost:27017/hrms`, async function(err, db){

    if(err) {
        console.error("Failed to Connect Mongoose");
        console.error(err);
        db.close();
        return;
    }

    const jobs = await jobModel.find({}).select('_id')

    new candidateAccount({
        jobID: jobs[1]._id,
        email: 'testcandiadate' + 4 + '@domain.com',
        name: 'test candiadate' + 4,
        phoneNumber: '192873981273',
        experience: '5 years',
        applyDate: Date.now(),
    }).save((err) => {
        if (err) {
            console.error(err);
            db.close()
            return;
        } else {
            console.log({
                success: 1,
                message: 'Candidate Added successfully.',
                data: {}
            });
            db.close()
            return;
        }
    });
});