const Joi = require('joi');
const validator = {};

validator.paymailRequestParameter = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().required(),
    paymailId: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.paymailPutRequest = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().required(),
    serviceId: Joi.string().required(),
    data: Joi.object({
      newPaymailId: Joi.string().allow('', null),
    }).required(),
  });

  await schema.validateAsync(opts);
};

validator.paymailPostRequest = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().required(),
    data: Joi.object({
      activate: Joi.boolean(),
    }).required(),
  });

  await schema.validateAsync(opts);
};


validator.getPaymailBsv = async (opts) => {
  const schema = Joi.object({
    paymail: Joi.string().required(),
  });

  await schema.validateAsync(opts);
};

validator.bsvAddressRequest = async (opts) => {
  const schema = Joi.object({
    paymail: Joi.string().required(),
    data: Joi.object({
      senderHandle: Joi.string().allow('', null),
      dt: Joi.string().allow('', null),
      signature: Joi.string().allow('', null),
      amount: Joi.number(),
      purpose: Joi.string().allow('', null),
      senderName: Joi.string().allow('', null),
    }).required(),
  });

  await schema.validateAsync(opts);
};

validator.bsvVerifypubkeyRequest = async (opts) => {
  const schema = Joi.object({
    paymail: Joi.string().required(),
    pubkey: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.bsvTransactionRequest = async (opts) => {
  const schema = Joi.object({
    paymail: Joi.string().required(),
    data: Joi.object({
      hex: Joi.string().allow('', null),
      reference: Joi.string().allow('', null),
      metadata: Joi.Object({
        sender: Joi.string().allow('', null),
        pubkey: Joi.string().allow('', null),
        signature: Joi.string().allow('', null),
        note: Joi.string().allow('', null),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.bsvP2PRequest = async (opts) => {
  const schema = Joi.object({
    paymail: Joi.string().required(),
    data: Joi.object({
      satoshis: Joi.number(),
    }).required(),
  });
  await schema.validateAsync(opts);
};


module.exports = validator;
