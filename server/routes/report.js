const router = require("express").Router();
const auth = require("../middleware/auth");

const User = require("../models/User");
const Report = require("../models/Report");

router.post("/", auth, async (req, res) => {
  try {
    const verseId = req.body.clientId;
    const againstUser = req.body.againstId;
    res.send({ success: true, message: "reported" });
  } catch (e) {
    res.send({ success: false, message: "Error occured in /report" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate({
      path: "reports",
      populate: {
        path: "verse",
        select: "-clientId -clientSecret -authorizedUsers -_id",
      },
    });

    if (!user) return res.send({ success: false, message: "Invalid Token" });

    res.send({ success: true, reports: user.reports });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "Error occured in GET /report" });
  }
});

module.exports = router;
