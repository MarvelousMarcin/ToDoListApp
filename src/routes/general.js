const express = require("express");
const auth = require("./auth");
const Session = require("../models/Session");
const generalRoute = express.Router();

generalRoute.get("/", (req, res) => {
  res.render("login");
});

generalRoute.post("/addSession", auth, async (req, res) => {
  const userId = req.user._id;
  const time = req.body.time;
  const sessionBody = {
    time,
    user: userId,
  };

  const session = new Session(sessionBody);
  try {
    session.save();
    res.send();
  } catch (error) {
    res.status(400).send({ error });
  }
});

generalRoute.get("/getSession", auth, async (req, res) => {
  try {
    const user = req.user._id;
    const session = await Session.findOne({ user });
    if (session) {
      res.send(session);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

generalRoute.delete("/deleteSession", auth, async (req, res) => {
  try {
    const user = req.user._id;
    await Session.deleteOne({ user });
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

generalRoute.get("/*", (req, res) => {
  res.render("page404");
});

module.exports = generalRoute;
