const Joi = require('joi');

class Validator {
  async initBeta(opts) {
    const schema = Joi.object({
      mnemonic: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };
}


module.exports = new Validator();
