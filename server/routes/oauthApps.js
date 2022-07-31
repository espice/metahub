const router = require("express").Router();
const OAuthApp = require("../models/OAuthApp");
const User = require("../models/User");

const auth = require("../middleware/auth");
const makeid = require("../utils/makeId");

router.get("/", auth, async (req, res) => {
  try {
    const apps = await OAuthApp.find({ owner: req.user.id });
    res.send({ success: true, apps });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "Error occured in /oAuthApps/" });
  }
});

router.get("/authorized", auth, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).populate({
      path: "authorizedApps",
      select: "-clientId -clientSecret -_id",
    });
    console.log(user.authorizedApps)
    if (!user) return res.send({ success: false, message: "Invalid Token" });
  
    res.send({ success: true, authorizedApps: user.authorizedApps });
  } catch (e) {
    res.send({ success: false, message: "Error in /oAuthApps/authorized" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newApp = {
      name: req.body.name,
      description: req.body.description ?? "",
      callbackUrl: req.body.callbackUrl,
    };

    if (
      !newApp.name ||
      newApp.name === "" ||
      newApp.name.trim() === "" ||
      !newApp.callbackUrl ||
      newApp.callbackUrl === "" ||
      newApp.callbackUrl.trim() === ""
    ) {
      return res.send({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.send({ success: false, message: "Invalid Token" });

    newApp.clientId = makeid(15);
    newApp.clientSecret = makeid(35);
    newApp.owner = user._id;

    const app = await OAuthApp.create({ _id: newApp.clientId, ...newApp });
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { OAuthApps: newApp.clientId } }
    );
    res.send({ success: true, app });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "Error occured in POST /oAuthApps" });
  }
});

module.exports = router;
