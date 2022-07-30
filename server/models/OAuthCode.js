const mongoose = require("mongoose");

const oAuthCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verse: {
    type: String,
    ref: "OAuthApp",
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});

module.exports = mongoose.model("OAuthCode", oAuthCodeSchema);
