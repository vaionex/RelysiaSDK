const Joi = require('joi');

class Validator {
  async getPaymail(opts) {
    const schema = Joi.object({
      serviceId: Joi.string(),
      paymailId: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async updatePaymail(opts) {
    const schema = Joi.object({
      walletId: Joi.string(),
      serviceId: Joi.string(),
      data: Joi.object({
        newPaymailId: Joi.string().required(),
      }).required(),
    });

    await schema.validateAsync(opts);
  };

  async activatePaymail(opts) {
    const schema = Joi.object({
      walletId: Joi.string(),
      serviceId: Joi.string(),
      data: Joi.object({
        activate: Joi.boolean(),
      }).required(),
    });
    await schema.validateAsync(opts);
  };
}


module.exports = new Validator();
