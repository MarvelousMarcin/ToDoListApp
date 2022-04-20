const express = require("express");
const User = require("../models/User");
const {
  userValidateRegister,
  userValidateLogin,
} = require("../validate/validateUser");
const userRoute = express.Router();
const bcrypy = require("bcrypt");

// Registration
userRoute.post("/register", async (req, res) => {
  const { error } = userValidateRegister.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const saltRounds = 10;
  bcrypy.hash(req.body.password, saltRounds, async function (err, hash) {
    if (err) {
      return res.status(400).send(err);
    }
    req.body.password = hash;
    const user = new User(req.body);
    try {
      await user.save();
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
});

// Login
userRoute.post("/login", async (req, res) => {
  const { error } = userValidateLogin.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findByMail(req.body.email);
  if (user === null) {
    return res.status(400).send({ error: "Wrong password or email" });
  }

  const match = await bcrypy.compare(req.body.password, user.password);
  if (match) {
    res.status(200).send(user);
  } else {
    res.status(400).send({ error: "Wrong password or email" });
  }
});

module.exports = userRoute;
