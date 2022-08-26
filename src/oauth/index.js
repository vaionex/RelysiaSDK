const validator = require("./validator");
const Request = require("../request");

class Oauth {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
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
    const headers = {
      authToken: this.auth.authToken,
    };
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
    const headers = {
      authToken: this.auth.authToken,
    };
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
    const headers = {
      authToken: this.auth.authToken,
    };
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
    const headers = {
      authToken: this.auth.authToken,
    };
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
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, opts.data, headers);
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
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Oauth;
