const Joi = require("joi");
const validator = {};

validator.uri = async (opts) => {
  const schema = Joi.object().required().keys({
    uri: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.currencyConversion = async (opts) => {
  const schema = Joi.object().required().keys({
    satoshis: Joi.string().required(),
    currency: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.transpile = async (opts) => {
  const schema = Joi.object().required().keys({
    force: Joi.boolean(),
    data: Joi.object().required().keys({
      sourceCode: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.compile = async (opts) => {
  const schema = Joi.object().required().keys({
    data: Joi.object().required().keys({
      sourceCode: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.post = async (opts) => {
  const schema = Joi.object().required().keys({
    walletid: Joi.string().required(),
    serviceid: Joi.string().required(),
    data: Joi.object().required().keys({
      dataArray: Joi.array().min(1).items({
        notes: Joi.array().required(),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.upload = async (opts) => {
  const schema = Joi.object().required().keys({
    walletid: Joi.string().required(),
    serviceid: Joi.string().required(),
    data: Joi.object().required().keys({
      fileUrl: Joi.string().allow("", null),
      fileName: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
