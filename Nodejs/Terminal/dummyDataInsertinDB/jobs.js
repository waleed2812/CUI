const mongoose = require('mongoose'),
    jobModel = require('./schema').jobModel;

mongoose.connect(`mongodb://localhost:27017/hrms`, async function(err, db){

    if(err) {
        console.error("Failed to Connect Mongoose");
        console.error(err);
        db.close();
        return;
    }

    for (let i =0 ; i < 10 ; i++ ) {

        new jobModel({title: 'New Job ' + i}).save((err) => {
            if (err) {
                console.error(err);
                return;
            } else {
                console.log({
                    success: 1,
                    message: 'Job Added successfully.',
                    data: {}
                });
                return;
            }
        });

    }
});