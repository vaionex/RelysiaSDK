const validator = require('./validator');
const Request = require('../request');

class Admin {
  constructor(auth) {
    this.authToken = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) {
      throw new Error('You must logged In. Try calling auth() method first');
    }
  }

  /**
   * Migrate Token
   * @param {object} opts - is opts
   * @return {object} - is response object `{statusCode: 'string', data: 'object'}`
   */
  async migrateToken(opts) {
    await this.validate();
    await this.validator.migrateToken(opts);
    const url = `/migrateToken`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = this.request.postRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Generate a domain verification Token
   * @param {object} opts - is options
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async generateToken(opts) {
    await this.validate();
    await this.validator.migrateToken(opts);
    const url = `/domain/generateToken`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.userId) headers.userId = opts.userId;
    const resp = this.request.postRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * verify domain ownership
   * @param { object} opts - is opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async verifyToken(opts) {
    await this.validate();
    await this.validator.verifyToken(opts);
    const url = `/domain/${opts.userId}/verifyToken`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * setup
   * @param {object} opts - is options
   * @return {object}
   */
  async setUp(opts) {
    await this.validate();
    await this.validator.setUp(opts);
    const url = `/setup`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.postRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * getSetupServiceId
   * @param {object} opts
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async getSetUpParameter(opts) {
    await this.validate();
    await this.validator.getSetUpParameter(opts);
    const url = `/setup/${serviceId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.getRequest(url, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * putSetupParameter
   * @param {object} opts - is options
   * @return {object} is response object `{statusCode: 'string', data: 'object'}`
   */
  async putSetUpParameter(opts) {
    await this.validate();
    await this.validator.putSetUpParameter(opts);
    const url = `/setup/${serviceId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.putRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * deleteSetupParameter
   * @param {object} opts - is options
   * @return {object}
   */
  async deleteSetUpParameter(opts) {
    await this.validate();
    await this.validator.deleteSetUpParameter(opts);
    const url = `/setup/${serviceId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.deleteRequest(url, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * getServiceIds
   * @param {object} opts
   * @return {object}
   */
  async getServiceIds(opts) {
    await this.validate();
    const url = `/setup/serviceIds`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = this.request.getRequest(url, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Admin;
