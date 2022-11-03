const Joi = require('joi');

class Validator {
  async auth(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  async signUp(opts) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  async resetPassword(opts) {
    const schema = Joi.object({
      email: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  async sendOTP(opts) {
    const schema = Joi.object({
      from: Joi.string().required(),
      to: Joi.string().required(),
      message: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };

  async validateOtp(opts) {
    const schema = Joi.object({
      to: Joi.string().required(),
      otp: Joi.string().required(),
    }).required();
    await schema.validateAsync(opts);
  };
}


module.exports = new Validator();
