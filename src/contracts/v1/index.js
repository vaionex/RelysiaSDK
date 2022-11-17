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
   * mint a token
   *@param {object} opts
   * @return {object}
   */
  async issue(opts) {
    await this.validate();
    await this.validator.issue(opts);
    const url = `/issue`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.protocol) headers.protocol = opts.protocol;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
  /**
   * get stas token details
   *@param {object} opts
   * @return {object}
   */
  async tokenDetails(opts) {
    await this.validate();
    await this.validator.getTokenDetails(opts);
    const url = `/token/${opts.id}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get stas token details
   *@param {object} opts
   * @return {object}
   */
  async redeem(opts) {
    await this.validate();
    await this.validator.redeem(opts);
    const url = `/redeem`;
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

module.exports= V1;
