const Joi = require('joi');


class Validator {
  async createWallet(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletTitle: Joi.string().required(),
      type: Joi.string().allow('', null),
      walletLogo: Joi.string().allow('', null),
      walletPassword: Joi.string().allow('', null),
    }).required();
    await schema.validateAsync(opts);
  };

  async metrics(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async address(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async allAddresses(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async balance(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
      currency: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async history(opts) {
    const schema = Joi.object({
      nextPageToken: Joi.string().allow('', null),
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
      type: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };


  async wallets(opts) {
    const schema = Joi.object({
      oauth: Joi.string().allow('', null),
      serviceId: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async mnemonic(opts) {
    const schema = Joi.object({
      serviceId: Joi.string().allow('', null),
      walletId: Joi.string().allow('', null),
    });
    await schema.validateAsync(opts);
  };

  async deleteWallet(opts) {
    const schema = Joi.object({
      walletId: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async leaderboard(opts) {
    const schema = Joi.object({
      tokenId: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };
}


module.exports = new Validator;
