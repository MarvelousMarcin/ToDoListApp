const Joi = require("joi");

const userValidateRegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(1024).required(),
  name: Joi.string().min(4).max(30).required(),
});

const userValidateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(1024).required(),
});

module.exports = { userValidateRegister, userValidateLogin };
