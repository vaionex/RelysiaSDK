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
   * get paymail
   *@param {object} opts
   * @return {object}
   */
  async getPaymailDetails(opts) {
    await this.validate();
    await this.validator.getPaymail(opts);
    const url = `/paymail/${opts.paymailId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * put paymail
   * @param {object} opts
   * @return {object}
   */
  async updatePaymail(opts) {
    await this.validate();
    await this.validator.updatePaymail(opts);
    const url = `/paymail`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletId) headers.walletId = opts.walletId;
    if (this.serviceId) headers.serviceId = this.serviceId;
    const resp = await this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Activate and Deactivate paymail
   *@param {object} opts
   * @return {object}
   */
  async activatePaymail(opts) {
    await this.validate();
    await this.validator.activatePaymail(opts);
    const url = `/paymail/${opts.activate}`;
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
