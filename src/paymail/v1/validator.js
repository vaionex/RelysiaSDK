const Joi = require('joi');

class Validator {
  async getPaymail(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().required(),
      paymailId: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async updatePaymail(opts) {
    const schema = Joi.object({
      walletId: Joi.string().required(),
      serviceId: Joi.string().required(),
      data: Joi.object({
        newPaymailId: Joi.string().allow('', null),
      }).required(),
    });

    await schema.validateAsync(opts);
  };

  async activatePaymail(opts) {
    const schema = Joi.object({
      walletId: Joi.string().required(),
      data: Joi.object({
        activate: Joi.boolean(),
      }).required(),
    });

    await schema.validateAsync(opts);
  };
}


module.exports = new Validator();
