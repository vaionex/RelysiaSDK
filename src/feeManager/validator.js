const Joi = require("joi");
const validator = {};

validator.initBeta = async (opts) => {
  const schema = Joi.object().required().keys({
    mnemonic: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
