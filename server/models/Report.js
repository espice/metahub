const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  against: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  verse: {
    type: String,
    required: true,
    ref: "OAuthApp",
  },
  reason: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Report", reportSchema);
