const Request = require('./../../request');
const validator = require('./validator');

class V2 {
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
   * return coin & balances
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   **/
  async balance(opts) {
    await this.validate();
    if (!opts) opts = {};
    await this.validator.balance(opts);
    const url = `/balance`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.currency) headers.currency = opts.currency;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V2;
