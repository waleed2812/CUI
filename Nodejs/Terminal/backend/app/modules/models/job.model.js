const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let jobModel = new schema({
    title: { type: String, default: '' },
});

jobModel.plugin(mongoose_timestamps);

module.exports = mongoose.model('jobModel', jobModel, 'jobModel');