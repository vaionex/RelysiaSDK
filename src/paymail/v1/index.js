const validator = require('./validator');
const Request = require('../../request');

class V1 {
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
   * get paymail
   *@param {object} opts
   * @return {object}
   */
  async paymailRequest(opts) {
    await this.validate();
    await this.validator.paymailRequestParameter(opts);
    const url = `/paymail/${opts.paymailId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    const resp = this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * put paymail
   * @param {object} opts
   * @return {object}
   */
  async putPaymailRequest(opts) {
    await this.validate();
    await this.validator.paymailPutRequest(opts);
    const url = `/paymail`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletId) headers.walletId = opts.walletId;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    const resp = this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Activate and Deactivate paymail
   *@param {object} opts
   * @return {object}
   */
  async postPaymailRequest(opts) {
    await this.validate();
    await this.validator.paymailPostRequest(opts);
    const url = `/paymail/${opts.activate}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;
