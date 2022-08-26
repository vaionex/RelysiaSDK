const Joi = require("joi");
const validator = {};

validator.deleteNotificationToken = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().allow("", null),
    userID: Joi.string().required()
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
