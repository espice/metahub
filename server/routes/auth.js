const User = require("../models/User");
const OAuthApp = require("../models/OAuthApp");
const OAuthCode = require("../models/OAuthCode");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const config = require("../config");
const cookieConfig = config.cookieConfig;

const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const makeid = require("../utils/makeId");

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

router.post("/authorize", auth, async (req, res) => {
  try {
    const clientId = req.query.clientId;
    if (!clientId)
      return res.send({ success: false, message: "Client ID not provided" });

    const app = await OAuthApp.findOne({ _id: clientId });
    if (!app) return res.send({ success: false, message: "Invalid Client ID" });

    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.send({ success: false, message: "Invalid Token" });

    const alreadyAuthorized = app.authorizedUsers.includes(user._id);
    console.log(app.authorizedUsers, user._id, alreadyAuthorized);

    if (alreadyAuthorized) {
      const doesCodeExist = await OAuthCode.findOne({
        user: user._id,
        verse: app.clientId,
      });

      if (doesCodeExist) {
        return res.send({
          success: true,
          redirectTo: `${app.callbackUrl}?code=${doesCodeExist.code}`,
        });
      }

      const code = await OAuthCode.create({
        code: makeid(50),
        user: user._id,
        verse: app.clientId,
      });

      return res.send({
        success: true,
        redirectTo: `${app.callbackUrl}?code=${code.code}`,
      });
    } else {
      await OAuthApp.findOneAndUpdate(
        { _id: clientId },
        { $push: { authorizedUsers: user._id } }
      );

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: { authorizedApps: clientId },
        }
      );

      const doesCodeExist = await OAuthCode.findOne({
        user: user._id,
        verse: app.clientId,
      });

      if (doesCodeExist) {
        return res.send({
          success: true,
          redirectTo: `${app.callbackUrl}?code=${doesCodeExist.code}`,
        });
      }

      const code = await OAuthCode.create({
        code: makeid(50),
        user: user._id,
        verse: app.clientId,
      });

      return res.send({
        success: true,
        redirectTo: `${app.callbackUrl}?code=${code.code}`,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      success: false,
      message: "An error occured in /auth/authorize",
    });
  }
});

router.get("/apps/:clientId", auth, async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const app = await OAuthApp.findOne({ _id: clientId }).lean().populate({
      path: "owner",
      select: "username tag avatar",
    });
    if (!app) return res.send({ success: false, message: "Invalid Client ID" });

    const user = await User.findOne({ _id: req.user.id }).lean();
    if (!user) return res.send({ success: false, message: "Invalid Token" });

    const alreadyAuthorized = app.authorizedUsers.some(
      (id) => id.toString() === user._id.toString()
    );
    console.log(app.authorizedUsers, user._id, alreadyAuthorized);

    if (alreadyAuthorized) {
      const doesCodeExist = await OAuthCode.findOne({
        user: user._id,
        verse: app.clientId,
      });

      if (doesCodeExist) {
        return res.send({
          success: true,
          alreadyAuthorized,
          redirectTo: `${app.callbackUrl}?code=${doesCodeExist.code}`,
        });
      }

      const code = await OAuthCode.create({
        code: makeid(50),
        user: user._id,
        verse: app.clientId,
      });

      return res.send({
        success: true,
        alreadyAuthorized,
        redirectTo: `${app.callbackUrl}?code=${code.code}`,
      });
    }

    res.send({
      success: true,
      alreadyAuthorized,
      app: {
        ...app,
        _id: null,
        clientId: null,
        clientSecret: null,
        authorizedUsers: null,
      },
    });
  } catch (e) {
    res.send({
      success: false,
      message: "An error occured in /auth/apps/:clientId",
    });
  }
});

router.get("/access_token", async (req, res) => {
  try {
    const clientId = req.query.clientId;
    const clientSecret = req.query.clientSecret;
    const code = req.query.code;

    const isCodeReal = await OAuthCode.findOne({ code })
      .lean()
      .populate({ path: "verse" })
      .populate({ path: "user" });
    if (!isCodeReal)
      return res.send({ success: false, message: "Invalid Code" });

    const codeId = isCodeReal.verse.clientId;
    const codeSecret = isCodeReal.verse.clientSecret;

    if (codeId !== clientId || codeSecret !== clientSecret)
      return res.send({
        success: false,
        message: "Invalid Client ID or Client Secret",
      });

    const accessToken = jwt.sign(
      { id: isCodeReal.user._id, clientId },
      process.env.ACCESS_TOKEN_KEY
    );

    res.send({ success: true, access_token: accessToken });
  } catch (e) {
    console.log(e);
    res.send({
      success: false,
      message: "Error occured in /auth/access_token",
    });
  }
});

router.post("/revoke/:clientId", auth, async (req, res) => {
  try {
    if (req.user.isApp) {
      return res.send({
        success: false,
        message: "You do not have permission to do this action",
      });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { authorizedApps: req.params.clientId } }
    );
    await OAuthApp.findOneAndUpdate(
      { _id: req.params.clientId },
      { $pull: { authorizedUsers: req.user.id } }
    );

    console.log("should have worked");
    res.send({ success: true, message: "done" });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "An error occured" });
  }
});

module.exports = router;
