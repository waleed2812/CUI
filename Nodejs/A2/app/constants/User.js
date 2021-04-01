const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    firstName: String,
    lastName: String
  },
  age: Number,
  email: String,
  bio: [{summary: String}],
});

const User = mongoose.model('user', userSchema);

module.exports = User;