'use strict'; 

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp');

const schema = mongoose.Schema; 

let quiz = new schema ({
    course: {type: String, default: '', required: true},
    code: {type: String, default: '', required: true},
    room: { type: String, default: ''},
    teacher: {type: schema.Types.ObjectId, required: true, ref: 'userAccount'},
    students: {type: schema.Types.ObjectId, ref: 'userAccount'},
    obtained: { type: String, default: '0', required: true},
    total: { type: String, default: '0', required: true},
    filePath: { type: String, default: ''}
}); 

quiz.plugin(mongoose_timestamps);

module.exports = mongoose.model('quiz', quiz);



























