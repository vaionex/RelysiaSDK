const validator = require("./validator");
const Request = require("../request");

class Paymail {
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
   * get paymail
   * @param  { paymailId, serviceId }
   * @returns {data: {status, msg}, statusCode}
   */
  async paymailRequest(opts) {
    await this.validate();
    await this.validator.paymailRequestParameter(opts);
    const url = `/paymail/${opts.paymailId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const resp = this.request.getRequest(url, headers);
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
    const headers = {
      authToken: this.auth.authToken,
    };
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
    const headers = {
      authToken: this.auth.authToken,
    };
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
    const url = `/bsvalias/id/${opts.paymail}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.getRequest(url, headers);
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
    const url = `/bsvalias/address/${opts.paymail}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, opts.data, headers);
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
    const url = `/bsvalias/verifypubkey/${opts.paymail}/${pubkey}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, headers);
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
    const url = `/bsvalias/receive-transaction/${opts.paymail}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, headers);
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
    const url = `/bsvalias/p2p-payment-destination/${opts.paymail}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, headers);
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
    const url = `/well-known/bsvalias`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Paymail;
