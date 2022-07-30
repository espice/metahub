const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.send({ success: false, message: "Token not provided" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.send({ success: false, message: "Invalid token" });
  }
}

module.exports = auth;
