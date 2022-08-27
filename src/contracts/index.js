const validator = require("./validator");
const Request = require("../request");

class Contracts {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) {
      await this.auth.auth();
    }
  }

  /**
   * mint a token
   * @param { serviceid, protocol, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async issue(opts) {
    await this.validate();
    await this.validator.issue(opts);
    const url = `/issue`;
    const headers = {
      authToken: this.auth.authToken
    };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.protocol) headers.protocol = opts.protocol;
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
  /**
   * get stas token details
   * @param { id }
   * @returns {data: {status, msg}, statusCode}
   */
  async getTokenDetails(opts) {
    await this.validate();
    await this.validator.getTokenDetails(opts);
    const url = `/token/${opts.id}`;
    const headers = {
      authToken: this.auth.authToken
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get stas token details
   * @param { walletid, serviceid, data }
   * @returns {data: {status, msg}, statusCode}
   */
  async redeem(opts) {
    await this.validate();
    await this.validator.redeem(opts);
    const url = `/redeem`;
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

module.exports= Contracts;
