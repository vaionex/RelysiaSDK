const Joi = require("joi");
const validator = {};

validator.auth = async (opts) => {
  const schema = Joi.object({
    serviceID: Joi.string().allow("", null),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

validator.signUp = async (opts) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

validator.resetPassword = async (opts) => {
  const schema = Joi.object({
    email: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

validator.sendOTP = async (opts) => {
  const schema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    message: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

validator.validateOtp = async (opts) => {
  const schema = Joi.object({
    to: Joi.string().required(),
    otp: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

module.exports = validator;
