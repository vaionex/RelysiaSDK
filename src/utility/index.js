const validator = require("./validator");
const Request = require("../request");

class Utility {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * Resolve address and paymail alias information
   * @param  { uri }
   * @returns {data: {status, msg}, statusCode}
   */
  async uri(opts) {
    await this.validate();
    await this.validator.uri(opts);
    const url = `/URI`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.uri) headers.uri = opts.uri;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Converts BSV satoshis to fiat currency
   * @param  { satoshis, currency }
   * @returns {data: {status, msg}, statusCode}
   */
  async currencyConversion(opts) {
    await this.validate();
    await this.validator.currencyConversion(opts);
    const url = `/currencyConversion`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.satoshis) headers.satoshis = opts.satoshis;
    if (opts.currency) headers.currency = opts.currency;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * transpile solidity code to sCrypt
   * @param  { force }
   * @returns {data: {status, msg}, statusCode}
   */
  async transpile(opts) {
    await this.validate();
    await this.validator.transpile(opts);
    const url = `/transpile`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.force) headers.force = opts.force;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * compile sCrypt code to Bitcoin sCrypt
   * @param  {}
   * @returns {data: {status, msg}, statusCode}
   */
  async compile(opts) {
    await this.validate();
    await this.validator.compile(opts);
    const url = `/compile`;
    const headers = {
      authToken: this.auth.authToken
   };
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Post messages to the Blockchain
   * @param  { walletid, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async post(opts) {
    await this.validate();
    await this.validator.post(opts);
    const url = `/post`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Blockchain File Upload
   * @param  { walletid, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async upload(opts) {
    await this.validate();
    await this.validator.upload(opts);
    const url = `/upload`;
    const headers = {
      authToken: this.auth.authToken
   };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Utility;
