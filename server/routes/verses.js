const router = require("express").Router();
const auth = require("../middleware/auth");
const OAuthApp = require("../models/OAuthApp");
const User = require("../models/User");

router.get("/my", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate({
      path: "authorizedApps",
      select: "-clientId -clientSecret -_id",
    });

    if (!user) return res.send({ success: false, message: "Invalid Token" });
    res.send({ success: true, myVerses: user.authorizedApps });
  } catch (e) {
    res.send({ success: false, message: "Error occured in /verses/my" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const verses = await OAuthApp.find({}).select(
      "-clientId -clientSecret -_id"
    );
    res.send({ success: true, verses });
  } catch (e) {
    res.send({ success: false, message: "Error in /verses/" });
  }
});

module.exports = router;
