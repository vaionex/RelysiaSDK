const Request = require('./../../request');
const validator = require('./validator');

class V1 {
  constructor(auth, serviceId) {
    this.auth = auth;
    this.serviceId = serviceId;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) {
      throw new Error('You must logged In. Try calling auth() method first');
    }
  }

  /**
   * create a wallet
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async createWallet(opts) {
    await this.validate();
    if (!opts) opts = {};
    if (!opts.walletTitle) opts.walletTitle = 'default';
    await this.validator.createWallet(opts);
    const url = `/createWallet`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletTitle) headers.walletTitle = opts.walletTitle;
    if (opts.type) headers.type = opts.type;
    if (opts.walletLogo) headers.walletLogo = opts.walletLogo;
    if (opts.walletPassword) headers.walletPassword = opts.walletPassword;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * shows detailed output of each utxo in wallet
   * @param {object} opts
   * @return {object} - is response object `{statusCode: 'string', data: 'object'}`
   **/
  async metrics(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.metrics(opts);
    const url = `/metrics`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return wallet address w.r.t walletId
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async address(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.address(opts);
    const url = `/address`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return all wallet addresses
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async allAddresses(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.allAddresses(opts);
    const url = `/allAddresses`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return coin & balances
   * @param {object} opts
   * @return {Promise<object>} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async balance(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.balance(opts);
    const url = `/balance`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    if (opts.currency) headers.currency = opts.currency;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return all past transactions histories
   * @param {object} opts
   * @return {object}
   **/
  async history(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.history(opts);
    const url = `/history`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.nextPageToken) headers.nextPageToken = opts.nextPageToken;
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    if (opts.type) headers.type = opts.type;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * list all wallets
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async wallets(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.wallets(opts);
    const url = `/wallets`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.oauth) headers.oauth = opts.oauth;
    if (this.serviceId) headers.serviceId = this.serviceId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return mnemonicPhrase data
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async mnemonic(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.mnemonic(opts);
    const url = `/mnemonic`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * delete a wallet w.r.t walletId
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async deleteWallet(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.deleteWallet(opts);
    const url = `/wallet`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = await this.request.deleteRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get leaderboard of tokenId
   * @param {string} opts - is id of fungible or non-fungible bsv token
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async leaderboard(opts) {
    await this.validator.leaderboard(opts);
    const url = `/leaderboard`;
    const headers = {
      authToken: this.auth.authToken,
      tokenId: opts.tokenId,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;
