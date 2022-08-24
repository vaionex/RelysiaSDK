const validator = require("./validator");
const Request = require("../request");

class Oauth {
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
   * create Client
   * @param {authToken}
   * @returns {data: {status, msg}, statusCode}
   */
  async registerClient(opts) {
    await this.validate();
    await this.validator.registerClient(opts);
    const url = `/oauth/register`;
    const headers = {};
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get Client by key
   * @param {key, authToken}
   * @returns {data: {status, msg}, statusCode}
   */
  async getClientByKey(opts) {
    await this.validate();
    await this.validator.getClientByKey(opts);
    const url = `/oauth/client/${key}`;
    const headers = {};
    const resp = this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Update Client
   * @param {authToken}
   * @returns {data: {status, msg}, statusCode}
   */
  async updateClient(opts) {
    await this.validate();
    await this.validator.updateClient(opts);
    const url = `/oauth/client/${key}`;
    const headers = {};
    const resp = this.request.patchRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Get Client
   * @param {authToken}
   * @returns {data: {status, msg}, statusCode}
   */
  async getClient(opts) {
    await this.validate();
    const url = `/oauth/client`;
    const headers = {};
    const resp = this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Generate Access Code
   * @param {}
   * @returns {data: {status, msg}, statusCode}
   */
  async generateCode(opts) {
    await this.validate();
    await this.validator.generateCode(opts);
    const url = `/oauth/access`;
    const resp = this.request.postRequest(url, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Generate OAuth
   * @param {}
   * @returns {data: {status, msg}, statusCode}
   */
  async generateToken(opts) {
    await this.validate();
    await this.validator.generateToken(opts);
    const url = `/oauth/token`;
    const resp = this.request.postRequest(url, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Oauth;
