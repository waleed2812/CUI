const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  name:{
    firstName: String,
    lastName: String
  },
  age: Number,
  email: String,
  bio: [{summary: String}],
});

const Person = mongoose.model('person', personSchema);

module.exports = Person;