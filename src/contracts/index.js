const validator = require("./validator");
const Request = require("../request");

class Contracts {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken)
      throw new Error("You must logged In. Try calling auth() method first");
  }

  /**
   * mint a token
   * @param { serviceId, protocol, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async issue(opts) {
    await this.validate();
    await this.validator.issue(opts);
    const url = `/issue`;
    const headers = {
      authToken: this.auth.authToken
    };
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.protocol) headers.protocol = opts.protocol;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
  /**
   * get stas token details
   * @param { id }
   * @returns {data: {status, msg}, statusCode}
   */
  async tokenDetails(opts) {
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
   * @param { walletID, serviceID, data }
   * @returns {data: {status, msg}, statusCode}
   */
  async redeem(opts) {
    await this.validate();
    await this.validator.redeem(opts);
    const url = `/redeem`;
    const headers = {
      authToken: this.auth.authToken
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports= Contracts;
