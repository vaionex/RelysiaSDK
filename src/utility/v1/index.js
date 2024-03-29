const validator = require('./validator');
const Request = require('../../request');

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
   * Resolve address and paymail alias information
   * @param  {object } opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async uri(opts) {
    await this.validate();
    await this.validator.uri(opts);
    const url = `/URI`;
    if (opts.uri) headers.uri = opts.uri;
    const resp = await this.request.getRequest(url, headers);
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
    const headers = {};
    if (opts.satoshis) headers.satoshis = opts.satoshis;
    if (opts.currency) headers.currency = opts.currency;
    const resp = await this.request.getRequest(url, headers);
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
    const headers = {};
    if (opts.force) headers.force = opts.force;
    const resp = await this.request.postRequest(url, opts.data, headers);
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
    const headers = {};
    const resp = await this.request.postRequest(url, opts.data, headers);
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
    if (opts.walletId) headers.walletId = opts.walletId;
    if (this.serviceId) headers.serviceId = this.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
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
    if (opts.walletId) headers.walletId = opts.walletId;
    if (this.serviceId) headers.serviceId = this.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;


