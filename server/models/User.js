const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 255,
  },
  tag: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minlength: 4,
  },
  accountCreationDate: {
    type: Date,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  OAuthApps: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "OAuthApp",
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
