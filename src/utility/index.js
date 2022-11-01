const validator = require('./validator');
const Request = require('../request');

class Utility {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) {
      throw new Error('You must logged In. Try calling auth() method first');
    }
  }

  /**
   * Resolve address and paymail alias information
   * @param  {object } opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async uri(opts) {
    await this.validate();
    await this.validator.uri(opts);
    const url = `/URI`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.uri) headers.uri = opts.uri;
    const resp = this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Converts BSV satoshis to fiat currency
   * @param  {object } opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async currencyConversion(opts) {
    await this.validate();
    await this.validator.currencyConversion(opts);
    const url = `/currencyConversion`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.satoshis) headers.satoshis = opts.satoshis;
    if (opts.currency) headers.currency = opts.currency;
    const resp = this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * transpile solidity code to sCrypt
   * @param  { object } opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async transpile(opts) {
    await this.validate();
    await this.validator.transpile(opts);
    const url = `/transpile`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.force) headers.force = opts.force;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * compile sCrypt code to Bitcoin sCrypt
   * @param  {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async compile(opts) {
    await this.validate();
    await this.validator.compile(opts);
    const url = `/compile`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Post messages to the Blockchain
   * @param  {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async post(opts) {
    await this.validate();
    await this.validator.post(opts);
    const url = `/post`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Blockchain File Upload
   * @param  {object} opts
   * @return {object}
   */
  async upload(opts) {
    await this.validate();
    await this.validator.upload(opts);
    const url = `/upload`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Utility;
