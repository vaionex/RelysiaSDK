const validator = require("./validator");
const Request = require("../request");

class Paymail {
  constructor(token) {
    this.authToken = token;
    this.validator = validator;
    this.request = new Request(token);
  }

  async validate() {
    if (!this.authToken)
      throw new Error("You must logged In. Try calling auth() method first");
  }

  /**
   * get paymail
   * @param  { paymailId, serviceId }
   * @returns {data: {status, msg}, statusCode}
   */
  async paymailRequest(opts) {
    await this.validate();
    await this.validator.paymailRequestParameter(opts);
    const url = `/paymail/${opts.paymailId}`;
    const headers = {};
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * put paymail
   * @param  { walletID, serviceId }
   * @returns {data: {status, msg}, statusCode}
   */
  async putPaymailRequest(opts) {
    await this.validate();
    await this.validator.paymailPutRequest(opts);
    const url = `/paymail`;
    const headers = {};
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const resp = this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Activate and Deactivate paymail
   * @param  { walletID}
   * @returns {data: {status, msg}, statusCode}
   */
  async postPaymailRequest(opts) {
    await this.validate();
    await this.validator.paymailPostRequest(opts);
    const url = `/paymail/${opts.activate}`;
    const headers = {};
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/id/{paymail}
   * @param  {paymail}
   * @returns {data: {status, msg}, statusCode}
   */
  async getPaymailBsv(opts) {
    await this.validate();
    await this.validator.getPaymailBsv(opts);
    const url = `bsvalias/id/${opts.paymail}`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/address/{paymail}
   * @param  {paymail}
   * @returns {data: {status, msg}, statusCode}
   */
  async bsvAddressRequest(opts) {
    await this.validate();
    await this.validator.bsvAddressRequest(opts);
    const url = `bsvalias/address/${opts.paymail}`;
    const resp = this.request.postRequest(url, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/verifypubkey/{paymail}/{pubkey}
   * @param  {paymail}
   * @returns {data: {status, msg}, statusCode}
   */
  async bsvVerifypubkeyRequest(opts) {
    await this.validate();
    await this.validator.bsvVerifypubkeyRequest(opts);
    const url = `bsvalias/verifypubkey/${opts.paymail}/${pubkey}`;
    const resp = this.request.postRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/receive-transaction/{paymail}
   * @param  {paymail}
   * @returns {data: {status, msg}, statusCode}
   */
  async bsvTransactionRequest(opts) {
    await this.validate();
    await this.validator.bsvTransactionRequest(opts);
    const url = `bsvalias/receive-transaction/${opts.paymail}`;
    const resp = this.request.postRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/p2p-payment-destination/{paymail}
   * @param  {paymail}
   * @returns {data: {status, msg}, statusCode}
   */
  async bsvP2PRequest(opts) {
    await this.validate();
    await this.validator.bsvP2PRequest(opts);
    const url = `bsvalias/p2p-payment-destination/${opts.paymail}`;
    const resp = this.request.postRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * .well-known/bsvalias
   * @param  {}
   * @returns {}
   */
  async wellKnownBsv(opts) {
    await this.validate();
    const url = `.well-known/bsvalias`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Paymail;
