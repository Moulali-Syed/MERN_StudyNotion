const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profession: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  phoneNo: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model('Profile', profileSchema);
