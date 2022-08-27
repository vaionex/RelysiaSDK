const validator = require("./validator");
const Request = require("../request");

class Transaction {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * send transaction to peers
   * @param { walletid, serviceid, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async send(opts) {
    await this.validate();
    await this.validator.send(opts);
    const url = `/send`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return rawtx
   * @param { walletid, serviceid, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async rawtx(opts) {
    await this.validate();
    await this.validator.rawtx(opts);
    const url = `/rawtx`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * withdraws coins from private key
   * @param {serviceid, secretKey, privateKey, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async drop(opts) {
    await this.validate();
    await this.validator.drop(opts);
    const url = `/drop`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    if (opts.secretKey) headers.secretKey = opts.secretKey;
    if (opts.privateKey) headers.privateKey = opts.privateKey;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create a swap offer
   * @param {walletid, serviceid, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async offer(opts) {
    await this.validate();
    await this.validator.offer(opts);
    const url = `/offer`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * accept swap offers
   * @param {walletid, serviceid, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async swap(opts) {
    await this.validate();
    await this.validator.swap(opts);
    const url = `/swap`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create swap offer for exchange
   * @param {walletid, serviceid, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async exchangeOffer(opts) {
    await this.validate();
    await this.validator.exchangeOffer(opts);
    const url = `/exchangeOffer`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * accept swap offer
   * @param {serviceid, secretKey, privateKey, data}
   * @returns {data: {status, msg}, statusCode}
   */
  async exchangeSwap(opts) {
    await this.validate();
    await this.validator.exchangeSwap(opts);
    const url = `/exchangeSwap`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * verifiy validity of offer
   * @param  { data }
   * @returns {data: {status, msg}, statusCode}
   */
  async inspect(opts) {
    await this.validate();
    await this.validator.inspect(opts);
    const url = `/inspect`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * pay the invoices
   * @param  { serviceid, secretKey, data }
   * @returns {data: {status, msg}, statusCode}
   */
  async pay(opts) {
    await this.validate();
    await this.validator.pay(opts);
    const url = `/pay`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create the invoices
   * @param  { serviceid, host, data }
   * @returns {data: {status, msg}, statusCode}
   */
  async invoice(opts) {
    await this.validate();
    await this.validator.invoice(opts);
    const url = `/invoice`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.host) headers.host = opts.host;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create the invoices
   * @param  { invoiceId }
   * @returns {data: {status, msg}, statusCode}
   */
  async paymentRequest(opts) {
    await this.validate();
    await this.validator.paymentRequestParameter(opts);
    const url = `/payment-request/${opts.invoiceId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create the invoices
   * @param  { invoiceId }
   * @returns {data: {status, msg}, statusCode}
   */
  async paymentRequestPay(opts) {
    await this.validate();
    await this.validator.paymentRequestWithData(opts);
    const url = `/payment-request/pay/${opts.invoiceId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Transaction;
