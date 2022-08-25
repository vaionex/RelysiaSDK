const Joi = require("joi");
const validator = {};

validator.deletenotificationToken = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().allow("", null),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
