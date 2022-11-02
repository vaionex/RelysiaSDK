const Joi = require('joi');

class Validator {
  async uri(opts) {
    const schema = Joi.object({
      uri: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async currencyConversion(opts) {
    const schema = Joi.object({
      satoshis: Joi.string().required(),
      currency: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async transpile(opts) {
    const schema = Joi.object({
      force: Joi.boolean(),
      data: Joi.object({
        sourceCode: Joi.string().allow('', null),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async compile(opts) {
    const schema = Joi.object({
      sourceCode: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async post(opts) {
    const schema = Joi.object({
      walletID: Joi.string().required(),
      serviceid: Joi.string().required(),
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          notes: Joi.array().required(),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async upload(opts) {
    const schema = Joi.object({
      walletID: Joi.string().required(),
      serviceid: Joi.string().required(),
      data: Joi.object({
        fileUrl: Joi.string().allow('', null),
        fileName: Joi.string().allow('', null),
      }).required(),
    });
    await schema.validateAsync(opts);
  };
}

module.exports = new Validator();
