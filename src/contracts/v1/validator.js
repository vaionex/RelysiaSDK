const Joi = require('joi');

class Validator {
  async issue(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      protocol: Joi.string().allow('', null),
      data: Joi.object().required(),
    });
    await schema.validateAsync(opts);
  };

  async getTokenDetails(opts) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async redeem(opts) {
    const schema = Joi.object({
      walletID: Joi.string().allow('', null),
      serviceID: Joi.string().allow('', null),
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          tokenId: Joi.string().required(),
          amount: Joi.number().required(),
          sn: Joi.string().allow('', null),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };
}


module.exports = new Validator();
