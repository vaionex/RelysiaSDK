const validator = require("./validator");
const Request = require("../request");

class Paymail {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * get paymail
   * @param  { paymailId, serviceid }
   * @returns {data: {status, msg}, statusCode}
   */
  async getPaymailById(opts) {
    await this.validate();
    await this.validator.getPaymailById(opts);
    const url = `/paymail/${opts.paymailId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * put paymail
   * @param  { walletid, serviceid }
   * @returns {data: {status, msg}, statusCode}
   */
  async updatePaymail(opts) {
    await this.validate();
    await this.validator.updatePaymail(opts);
    const url = `/paymail`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Activate and Deactivate paymail
   * @param  { walletid}
   * @returns {data: {status, msg}, statusCode}
   */
  async activatePaymail(opts) {
    await this.validate();
    await this.validator.activatePaymail(opts);
    const url = `/paymail/activate`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.postRequest(url, opts.data, headers);
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
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/address/{paymail}
   * @param  { paymail }
   * @returns {data: {status, msg}, statusCode}
   */
  async bsvAddressRequest(opts) {
    await this.validate();
    await this.validator.bsvAddressRequest(opts);
    const url = `/bsvalias/address/${opts.paymail}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * bsvalias/verifypubkey/{paymail}/{pubkey}
   * @param  {paymail}
   * @returns {data: {status, msg}, statusCode}
   */
  async bsvVerifyPubkeyRequest(opts) {
    await this.validate();
    await this.validator.bsvVerifypubkeyRequest(opts);
    const url = `/bsvalias/verifypubkey/${opts.paymail}/${opts.pubkey}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.postRequest(url, headers);
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
    const resp = await this.request.postRequest(url, headers);
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
    const resp = await this.request.postRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * .well-known/bsvalias
   * @param  {}
   * @returns {}
   */
  async wellKnownBsv() {
    await this.validate();
    const url = `/well-known/bsvalias`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Paymail;
