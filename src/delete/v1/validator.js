const Joi = require('joi');

class Validator {
  async deletenotificationToken(opts) {
    const schema = Joi.object({
      walletId: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };
}

module.exports = new Validator;
