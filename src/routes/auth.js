const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  let token = req.headers.cookie;
  token = token.substring(token.indexOf("=") + 1);

  if (!token) return res.redirect("/");

  try {
    const verified = jwt.verify(token, "TOBESECRET");
    req.user = verified;
    next();
  } catch (error) {
    res.redirect("/");
  }
};

module.exports = auth;
