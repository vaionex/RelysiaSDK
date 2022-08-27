const Joi = require("joi");
const validator = {};

validator.notificationToken = async (opts) => {
  const schema = Joi.object({
    userid: Joi.string().required(),
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      expoNotificationToken: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.sendNotification = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
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
