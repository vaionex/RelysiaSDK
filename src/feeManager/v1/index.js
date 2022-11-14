const validator = require('./validator');
const Request = require('../../request');

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
   * setup your Fee Manager
   * @param {object} opts
   * @return {object}
   */
  async initBeta(opts) {
    await this.validate();
    await this.validator.initBeta(opts);
    const url = `/initBeta`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.mnemonic) headers.mnemonic = opts.mnemonic;
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get all feeManager UTXOs
   *@param {object} opts
   * @return {object}
   */
  async feeMetricesBeta() {
    await this.validate();
    const url = `/feeMetricesBeta`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get all feeManager address
   *@param {object} opts
   * @return {object}
   */
  async feeAddressBeta() {
    await this.validate();
    const url = `/feeAddressBeta`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get all current state of fee Manager UTXOS
   *@param {object} opts
   * @return {object}
   */
  async feeUtxoState() {
    await this.validate();
    const url = `/feeUtxoState`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;
