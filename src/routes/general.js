const express = require("express");

const generalRoute = express.Router();

generalRoute.get("/", (req, res) => {
  res.render("login", {});
});

generalRoute.get("/*", (req, res) => {
  res.render("page404");
});

module.exports = generalRoute;
