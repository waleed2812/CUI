'use strict'; 

const mongoose = require('mongoose'),
    mongoose_timestamps = require('mongoose-timestamp'),
    userAccount = require('./users.model');

const schema = mongoose.Schema; 

let Class = new schema ({
    course: {type: String, default: '', required: true},
    code: {type: String, default: '', required: true},
    room: { type: String, default: '', required: true},
    teacher: {type: schema.Types.ObjectId, required: true, ref: 'userAccount'},
    students: [{type: schema.Types.ObjectId, ref: 'userAccount'}]
}); 

Class.plugin(mongoose_timestamps);

module.exports = mongoose.model('Class', Class);



























