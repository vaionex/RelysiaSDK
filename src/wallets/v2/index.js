const Request = require('./../../request');
const validator = require('./validator');

class V2 {
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
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    if (opts.type) headers.type = opts.type;
    if (opts.currency) headers.currency = opts.currency;
    if (opts.compact) headers.compact = opts.compact;
    let query;
    if (opts.nextPageToken) query = `?nextPageToken=${opts.nextPageToken}`;
    const resp = await this.request.getRequest(url, headers, false, query, this.request.version.V2);
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
    let query;
    if (opts.nextPageToken) query = `?nextPageToken=${opts.nextPageToken}`;
    if (this.serviceId) headers.serviceId = this.serviceId;
    if (opts.walletId) headers.walletId = opts.walletId;
    if (opts.type) headers.type = opts.type;
    const resp = await this.request.getRequest(url, headers, undefined, query, this.request.version.V2);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V2;
