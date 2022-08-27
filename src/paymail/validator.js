const Joi = require("joi");
const validator = {};

validator.getPaymailById = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().required(),
    paymailId: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.updatePaymail = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      walletid: Joi.string().required(),
      serviceid: Joi.string().required(),
      data: Joi.object().required().keys({
        newPaymailId: Joi.string().required(),
      }),
    });

  await schema.validateAsync(opts);
};

validator.activatePaymail = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      serviceid: Joi.string().allow(null, ""),
      walletid: Joi.string().required(),
      data: Joi.object().required().keys({
        activate: Joi.boolean().required(),
      }),
    });

  await schema.validateAsync(opts);
};

validator.getPaymailBsv = async (opts) => {
  const schema = Joi.object().required().keys({
    paymail: Joi.string().required(),
  });

  await schema.validateAsync(opts);
};

validator.bsvAddressRequest = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      paymail: Joi.string().required(),
      data: Joi.object()
        .required()
        .keys({
          senderHandle: Joi.string().allow("", null),
          dt: Joi.string().allow("", null),
          signature: Joi.string().allow("", null),
          amount: Joi.number(),
          purpose: Joi.string().allow("", null),
          senderName: Joi.string().allow("", null),
        }),
    });

  await schema.validateAsync(opts);
};

validator.bsvVerifypubkeyRequest = async (opts) => {
  const schema = Joi.object().required().keys({
    paymail: Joi.string().required(),
    pubkey: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.bsvTransactionRequest = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      paymail: Joi.string().required(),
      data: Joi.object()
        .required()
        .keys({
          hex: Joi.string().allow("", null),
          reference: Joi.string().allow("", null),
          metadata: Joi.object()
            .required()
            .keys({
              sender: Joi.string().allow("", null),
              pubkey: Joi.string().allow("", null),
              signature: Joi.string().allow("", null),
              note: Joi.string().allow("", null),
            }),
        }),
    });
  await schema.validateAsync(opts);
};

validator.bsvP2PRequest = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      paymail: Joi.string().required(),
      data: Joi.object().required().keys({
        satoshis: Joi.number(),
      }),
    });
  await schema.validateAsync(opts);
};

module.exports = validator;
