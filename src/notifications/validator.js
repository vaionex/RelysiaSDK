const Joi = require("joi");
const validator = {};

validator.notificationToken = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      userid: Joi.string().required(),
      walletid: Joi.string().allow("", null),
      serviceid: Joi.string().allow("", null),
      data: Joi.object()
        .required()
        .keys({
          expoNotificationToken: Joi.string().required()
        })
    });
  await schema.validateAsync(opts);
};

validator.sendNotification = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      walletid: Joi.string().allow("", null),
      serviceid: Joi.string().allow("", null),
      data: Joi.object()
        .required()
        .keys({
          type: Joi.string().allow("", null),
          userAddress: Joi.string().allow("", null),
          amount: Joi.number().allow("", null),
          transactionType: Joi.string().allow("", null),
        })
    });
  await schema.validateAsync(opts);
};

module.exports = validator;
