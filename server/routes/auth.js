const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("../config");
const cookieConfig = config.cookieConfig;

const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

router.post("/register", async (req, res) => {
  try {
    // console.log(req)
    const newUser = {
      username: req.body.username,
      tag: req.body.tag,
      email: req.body.email,
      dob: req.body.dob,
      password: req.body.password,
    };

    if (
      !newUser.email ||
      newUser.email == "" ||
      newUser.email.trim() == "" ||
      !newUser.username ||
      newUser.username == "" ||
      newUser.username.trim() == "" ||
      !newUser.password ||
      newUser.password == "" ||
      newUser.password.trim() == "" ||
      !newUser.dob ||
      newUser.dob == "" ||
      newUser.dob.trim() == "" ||
      !newUser.tag ||
      newUser.tag == "" ||
      newUser.tag.trim() == ""
    ) {
      return res.send({
        success: false,
        message: "All fields are required.",
      });
    }

    const validEmail = validateEmail(newUser.email);
    if (!validEmail)
      return res.send({ success: false, message: "Invalid Email ID" });

    const doesUserExist = await User.findOne({ email: newUser.email });
    if (doesUserExist)
      return res.send({
        success: false,
        message: "User with email already exists",
      });

    const hashed = await bcrypt.hash(newUser.password, 15);
    const user = await User.create({ ...newUser, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res
      .cookie("token", token, cookieConfig)
      .send({ success: true, userId: user._id });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "An error occured in /register" });
  }
});

router.get("/me", auth, async (req, res) => {
  const userId = req.user.id;

  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) return res.send({ succes: false, message: "Invalid Token" });

  res.send({ success: true, user });
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pswd = req.body.password;

    const user = await User.findOne({ email });
    if (!user)
      return res.send({
        success: false,
        message: "User with this email does not exist",
      });

    const match = await bcrypt.compare(pswd, user.password);
    if (!match)
      return res.send({ succes: false, message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    const finalUserToSend = await User.findOne({ email })
      .lean()
      .select("-password");

    res
      .cookie("token", token, cookieConfig)
      .send({ success: true, user: finalUserToSend });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: e });
  }
});

router.post("/logout", auth, (req, res) => {
  res.clearCookie("token", config.removeCookieConfig).send({ success: true });
});

module.exports = router;
