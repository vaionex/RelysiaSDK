const Joi = require('joi');

const validator = {};

validator.auth = async (opts) => {
  const schema = Joi.object({
    serviceID: Joi.string().allow('', null),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

validator.createWallet = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletTitle: Joi.string().required(),
    type: Joi.string().allow('', null),
    walletLogo: Joi.string().allow('', null),
    walletPassword: Joi.string().allow('', null),
  }).required();
  await schema.validateAsync(opts);
};

validator.metrics = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.address = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.allAddresses = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.balance = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
    currency: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.stasTokenBalance = async (opts) => {
  const schema = Joi.object({
    walletId: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.history = async (opts) => {
  const schema = Joi.object({
    nextPageToken: Joi.string().allow('', null),
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
    type: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.wallets = async (opts) => {
  const schema = Joi.object({
    oauth: Joi.string().allow('', null),
    serviceId: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.mnemonic = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.currencyConversion = async (opts) => {
  const schema = Joi.object({
    satoshis: Joi.string().required(),
    currency: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.URI = async (opts) => {
  const schema = Joi.object({
    uri: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.send = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.purchase = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
    data: Joi.object({
      dataArray: Joi.array().min(1),
      tokenId: Joi.string().allow('', null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.pay = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.issue = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    protocol: Joi.string().allow('', null),
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.tokenDetails = async (opts) => {
  const schema = Joi.object({
    tokenID: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.tokensCount = async (opts) => {
  const schema = Joi.object({
    address: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.upload = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
    walletID: Joi.string().allow('', null),
    body: Joi.object({
      type: Joi.string().valid('media').required(),
      fileUrl: Joi.string().required(),
      fileName: Joi.string().required(),
      notes: Joi.string().required(),
    }).required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;

