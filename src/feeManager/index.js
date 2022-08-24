const validator = require("./validator");
const Request = require("../request");

class FeeManager {
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
   * setup your Fee Manager
   * @param { mnemonic}
   * @returns {data: {status, msg}, statusCode}
   */
  async initBeta(opts) {
    await this.validate();
    await this.validator.initBeta(opts);
    const url = `/initBeta`;
    const headers = {};
    if (opts.mnemonic) headers.mnemonic = opts.mnemonic;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get all feeManager UTXOs
   * @param { }
   * @returns {}
   */
  async feeMetricesBeta() {
    await this.validate();
    const url = `/feeMetricesBeta`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get all feeManager address
   * @param { }
   * @returns {}
   */
  async feeAddressBeta() {
    await this.validate();
    const url = `/feeAddressBeta`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get all current state of fee Manager UTXOS
   * @param { }
   * @returns {}
   */
  async feeUtxoState() {
    await this.validate();
    const url = `/feeUtxoState`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = FeeManager;
