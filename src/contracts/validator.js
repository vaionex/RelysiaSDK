const Joi = require("joi");
const validator = {};

validator.issue = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      serviceid: Joi.string().allow("", null),
      protocol: Joi.string().allow("", null),
      walletid: Joi.string().allow("", null),
      data: Joi.object().required().keys({}),
    });
  await schema.validateAsync(opts);
};

validator.getTokenDetails = async (opts) => {
  const schema = Joi.object().required().keys({
    id: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.redeem = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      walletid: Joi.string().allow("", null),
      serviceid: Joi.string().allow("", null),
      data: Joi.object()
        .required()
        .keys({
          dataArray: Joi.array()
            .min(1)
            .items({
              tokenId: Joi.string().required(),
              amount: Joi.number().required(),
              sn: Joi.string().allow("", null),
            }),
        })
        .required(),
    });
  await schema.validateAsync(opts);
};

module.exports = validator;
