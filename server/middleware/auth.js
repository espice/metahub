const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.send({ success: false, message: "Token not Provided" });
    }

    try {
      let decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      req.user = decoded;
      req.user.isApp = true;
      next();
    } catch (e) {
      console.log(process.env.ACCESS_TOKEN_KEY);
      res.send({ success: false, message: "Invalid Access Token" });
    }
  } else {
    try {
      let decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (e) {
      res.send({ success: false, message: "Invalid token" });
    }
  }
}

module.exports = auth;
