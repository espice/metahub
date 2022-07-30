const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 255,
  },
  image: {
    type: String,
    minlength: 4,
  },
  email: {
    type: String,
    minlength: 4,
  },
  accountCreationDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('users', userSchema);
