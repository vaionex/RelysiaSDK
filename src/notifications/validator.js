const Joi = require("joi");
const validator = {};

validator.notificationToken = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().allow("", null),
    serviceID: Joi.string().allow("", null),
    data: Joi.object({
      expoNotificationToken: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.sendNotification = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().allow("", null),
    serviceID: Joi.string().allow("", null),
    data: Joi.object({
      type: Joi.string().allow("", null),
      userAddress: Joi.string().allow("", null),
      amount: Joi.number().allow("", null),
      transactionType: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
