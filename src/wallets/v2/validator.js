const Joi = require('joi');

class Validator {
  async balance(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
      currency: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async history(opts) {
    const schema = Joi.object({
      nextPageToken: Joi.string().allow('', null),
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
      type: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };
}


module.exports = new Validator;
