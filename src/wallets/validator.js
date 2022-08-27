const Joi = require("joi");
const validator = {};

validator.createWallet = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow("", null),
    walletTitle: Joi.string().required(),
    type: Joi.string().allow("", null),
    walletLogo: Joi.string().allow("", null),
    walletPassword: Joi.string().allow("", null),
  });
  await schema.validateAsync(opts);
};

validator.metrics = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow('', null),
    walletid: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.address = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow('', null),
    walletid: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.allAddresses = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow('', null),
    walletid: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.balance = async (opts) => {
  const schema = Joi.object().required().keys({
    nextPageToken: Joi.string().allow('', null),
    serviceid: Joi.string().allow('', null),
    walletid: Joi.string().allow('', null),
    currency: Joi.string().allow('', null),
    type: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.history = async (opts) => {
  const schema = Joi.object().required().keys({
    nextPageToken: Joi.string().allow('', null),
    serviceid: Joi.string().allow('', null),
    walletid: Joi.string().allow('', null),
    type: Joi.string().allow('', null),
    version: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};


validator.wallets = async (opts) => {
  const schema = Joi.object().required().keys({
    oauth: Joi.string().allow('', null),
    serviceid: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.mnemonic = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().allow('', null),
    walletid: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.deleteWallet = async (opts) => {
  const schema = Joi.object().required().keys({
    walletid: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
