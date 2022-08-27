const Joi = require("joi");
const validator = {};

validator.deleteNotificationToken = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    userid: Joi.string().required()
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
