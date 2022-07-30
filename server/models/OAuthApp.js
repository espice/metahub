const mongoose = require('mongoose');

const oauthAppSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
    unique: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
    default: 'https://github.com/identicons/app/app/dimension-explorer-v2-0',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  callbackUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  authorizedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
});

module.exports = mongoose.model('OAuthApp', oauthAppSchema);
