const Request = require("../request");
const validator = require("./validator");

class Wallets {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * create a wallet
   * @param {serviceid, walletTitle, walletLogo, type, walletPassword}
   * @returns {data: {status, msg}, statusCode}
   **/
  async createWallet(opts) {
    await this.validate();
    if (!opts) opts = {};
    if (!opts.walletTitle) opts.walletTitle = "default";
    await this.validator.createWallet(opts);
    const url = `/createWallet`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
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
   * @param {serviceid, walletid}
   * @returns {data: {status, msg}, statusCode}
   **/
  async metrics(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.metrics(opts);
    const url = `/metrics`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return wallet address w.r.t walletid
   * @param {serviceid, walletid}
   * @returns {data: {status, msg}, statusCode}
   **/
  async address(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.address(opts);
    const url = `/address`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return all wallet addresses
   * @param {serviceid, walletid}
   * @returns {data: {status, msg}, statusCode}
   **/
  async allAddresses(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.allAddresses(opts);
    const url = `/allAddresses`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return coin & balances
   * @param {serviceid, walletid, currency}
   * @returns {data: {status, msg}, statusCode}
   **/
  async balance(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.balance(opts);
    const url = `/balance`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.currency) headers.currency = opts.currency;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return all past transactions histories
   * @param {nextPageToken, serviceid, walletid, type}
   * @returns {data: {status, msg}, statusCode}
   **/
  async history(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.history(opts);
    const url = `/history`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.nextPageToken) headers.nextPageToken = opts.nextPageToken;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.type) headers.type = opts.type;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * list all wallets
   * @param {oauth, serviceid}
   * @returns {data: {status, msg}, statusCode}
   **/
  async wallets(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.wallets(opts);
    const url = `/wallets`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.oauth) headers.oauth = opts.oauth;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return mnemonicPhrase data
   * @param {serviceid, walletid}
   * @returns {data: {status, msg}, statusCode}
   **/
  async mnemonic(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.mnemonic(opts);
    const url = `/mnemonic`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * delete a wallet w.r.t walletid
   * @param {walletid}
   * @returns {data: {status, msg}, statusCode}
   **/
  async deleteWallet(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.deleteWallet(opts);
    const url = `/wallet`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.deleteRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Wallets;
