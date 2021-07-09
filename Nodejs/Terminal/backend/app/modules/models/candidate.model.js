const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    schema = mongoose.Schema;

let candidateAccount = new schema({
    email: { type: String, default: '' , unique: true},
    name: { type: String, default: '', required: true },
    profileImage: { type: String, default: '' },
    phoneNumber: { type: String, default: '' , unique: true},
    experience: { type: String, default: '' },
    resume: { type: String, default: '' },
    applyDate: { type: Date, default: Date.now() },
    jobID: {type: schema.Types.ObjectId, ref: 'jobModel'},
});

candidateAccount.plugin(mongoose_timestamps);

module.exports = mongoose.model('candidateAccount', candidateAccount, 'candidateAccount');