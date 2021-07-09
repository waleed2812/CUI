const jobModel = require('../../models/job.model');

const winston = require('../../../../config/winston'),
    mongoose = require('mongoose'),
    candidateAccount = mongoose.model('candidateAccount');

const getCandidateListing = async (req, res, next) => {

    try {

        const candidates = await candidateAccount.find({});
        const jobs = await jobModel.find({});

        return res.json({
            success: 1,
            message: "Candidates Record",
            data: {
                candidates: candidates,
                jobs: jobs
            }
        })

    } catch(err) {
        winston.err(err);
        res.redirect('/error')
    }
}

const addCandidate = async (req, res, next) => {

    try {

        const res = await new candidateAccount(req.body).save();

        return res.json({
            success: 1,
            message: "Candidate Added",
            data: res
        })

    } catch(err) {
        winston.err(err);
        res.redirect('/error')
    }
}

const getJobs = async (req, res, next) => {

    try {

        const jobs = await jobModel.find({});

        return res.json({
            success: 1,
            message: "Jobs Record",
            data: {
                jobs: jobs
            }
        })

    } catch(err) {
        winston.err(err);
        res.redirect('/error')
    }

}

module.exports = {
    getCandidateListing,
    addCandidate,
    getJobs
};