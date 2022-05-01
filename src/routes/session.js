const express = require("express");
const auth = require("../routes/auth");
const SessionData = require("../models/SessionData");

const finalSessionRoute = express.Router();

finalSessionRoute.post("/finalsession", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }

  const time = req.body.time;
  const date = req.body.date;
  const user = req.user._id;

  const body = { time, date, user };

  try {
    const sessionDate = new SessionData(body);
    await sessionDate.save();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
});

finalSessionRoute.patch("/finalsession", auth, async (req, res) => {
  try {
    const sessionToComplete = await SessionData.findOneAndUpdate(
      { completed: false, user: req.user._id },
      { completed: true }
    );
    await sessionToComplete.save();
  } catch (error) {
    res.status(400).send();
  }
});

finalSessionRoute.delete("/finalsession", auth, async (req, res) => {
  try {
    const sessionToComplete = await SessionData.findOneAndDelete({
      completed: false,
    });
    await sessionToComplete.save();
  } catch (error) {
    res.status(400).send();
  }
});

finalSessionRoute.get("/finalsession", auth, async (req, res) => {
  const sessions = await SessionData.find({
    user: req.user._id,
    completed: true,
  }).sort({
    date: -1,
  });

  if (!sessions) {
    return res.status(400).send();
  }

  res.send(sessions);
});

finalSessionRoute.delete("/session", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  try {
    await SessionData.deleteOne({ _id: req.body._id });
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

finalSessionRoute.patch("/session", auth, async (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }
  try {
    const sess = await SessionData.findOneAndUpdate(
      { _id: req.body._id },
      { title: req.body.title }
    );
    sess.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = finalSessionRoute;
