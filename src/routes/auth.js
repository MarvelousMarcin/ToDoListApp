const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const token = req.headers.cookie;
  if (!token) return res.redirect("/");

  try {
    const verified = jwt.verify(token, "TOBESECRET");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = auth;
