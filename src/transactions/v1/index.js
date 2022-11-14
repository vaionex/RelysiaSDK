const validator = require('./validator');
const Request = require('./../../request');

class V1 {
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
   * send transaction to peers
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async send(opts) {
    await this.validate();
    await this.validator.send(opts);
    const url = `/send`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * return rawtx
   * @param { object} opts is response object `{statusCode: 'string', data: 'object'}`
   * @return {object}
   */
  async rawtx(opts) {
    await this.validate();
    await this.validator.rawtx(opts);
    const url = `/rawtx`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * withdraws coins from private key
   * @param {object} opts
   * @return {object}
   */
  async drop(opts) {
    await this.validate();
    await this.validator.drop(opts);
    const url = `/drop`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    if (opts?.secretKey) headers.secretKey = opts.secretKey;
    if (opts?.privateKey) headers.privateKey = opts.privateKey;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create a swap offer
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async offer(opts) {
    await this.validate();
    await this.validator.offer(opts);
    const url = `/offer`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * accept swap offers
   * @param {object} opts
   * @return {object}
   */
  async swap(opts) {
    await this.validate();
    await this.validator.swap(opts);
    const url = `/swap`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create swap offer for exchange
   * @param {object} opts
   * @return {object}
   */
  async exchangeOffer(opts) {
    await this.validate();
    await this.validator.exchangeOffer(opts);
    const url = `/exchangeOffer`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * accept swap offer
   * @param {object} opts
   * @return {object}
   */
  async exchangeSwap(opts) {
    await this.validate();
    await this.validator.exchangeSwap(opts);
    const url = `/exchangeSwap`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * verifiy validity of offer
   * @param {object} opts
   * @return {object}
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
   * @param {object} opts
   * @return {object}
   */
  async pay(opts) {
    await this.validate();
    await this.validator.pay(opts);
    const url = `/pay`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.walletId) headers.walletId = opts.walletId;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create the invoices
   *@param {object} opts
   * @return {object}
   */
  async invoice(opts) {
    await this.validate();
    await this.validator.invoice(opts);
    const url = `/invoice`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts?.host) headers.host = opts.host;
    if (opts?.serviceId) headers.serviceId = opts.serviceId;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * create the invoices
   *@param {object} opts
   * @return {object}
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
   *@param {object} opts
   * @return {object}
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

module.exports = V1;
