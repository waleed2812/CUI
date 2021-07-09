const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let candidateAccount = new schema({
    email: { type: String, default: '' },
    name: { type: String, default: '', required: true },
    profileImage: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    experience: { type: String, default: '' },
    resume: { type: String, default: '' },
    applyDate: { type: Date, default: Date.now() },
    jobID: {type: schema.Types.ObjectId, ref: 'jobModel'},
});

candidateAccount.plugin(mongoose_timestamps);

let jobModel = new schema({
    title: { type: String, default: '' },
});

jobModel.plugin(mongoose_timestamps);

module.exports = {
    candidateAccount: mongoose.model('candidateAccount', candidateAccount, 'candidateAccount'),
    jobModel: mongoose.model('jobModel', jobModel, 'jobModel'),

};