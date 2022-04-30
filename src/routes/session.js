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
  const sessions = await SessionData.find({ user: req.user._id }).sort({
    date: -1,
  });

  if (!sessions) {
    return res.status(400).send();
  }

  res.send(sessions);
});

module.exports = finalSessionRoute;
