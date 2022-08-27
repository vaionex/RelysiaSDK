const Joi = require("joi");
const validator = {};

validator.auth = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow("", null),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.signUp = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow("", null),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.resetPassword = async (opts) => {
  const schema = Joi.object().required().keys({
    email: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.sendOTP = async (opts) => {
  const schema = Joi.object().required().keys({
    from: Joi.string().required(),
    to: Joi.string().required(),
    message: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.validateOtp = async (opts) => {
  const schema = Joi.object().required().keys({
    to: Joi.string().required(),
    otp: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
