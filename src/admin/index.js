const validator = require("./validator");
const Request = require("../request");

class Admin {
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
   * Migrate Token
   * @param { walletID}
   * @returns {data: {status, msg}, statusCode}
   */
  async migrateToken(opts) {
    await this.validate();
    await this.validator.migrateToken(opts);
    const url = `/migrateToken`;
    const headers = {};
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Generate a domain verification Token
   * @param {userId}
   * @returns {data: {status, msg}, statusCode}
   */
  async generateToken(opts) {
    await this.validate();
    await this.validator.migrateToken(opts);
    const url = `/domain/generateToken`;
    const headers = {};
    if (opts.userId) headers.userId = opts.userId;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * verify domain ownership
   * @param { userId}
   * @returns {data: {status, msg}, statusCode}
   */
  async verifyToken(opts) {
    await this.validate();
    await this.validator.verifyToken(opts);
    const url = `/domain/${opts.userId}/verifyToken`;
    const headers = {};
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * setup
   * @param { userId}
   * @returns {data: {status, msg}, statusCode}
   */
  async setUp(opts) {
    await this.validate();
    await this.validator.setUp(opts);
    const url = `/setup`;
    const resp = this.request.postRequest(url, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * getSetupServiceId
   * @param {serviceId}
   * @returns {data: {status, msg}, statusCode}
   */
  async getSetUpParameter(opts) {
    await this.validate();
    await this.validator.getSetUpParameter(opts);
    const url = `/setup/${serviceId}`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * putSetupParameter
   * @param {serviceId}
   * @returns {data: {status, msg}, statusCode}
   */
  async putSetUpParameter(opts) {
    await this.validate();
    await this.validator.putSetUpParameter(opts);
    const url = `/setup/${serviceId}`;
    const resp = this.request.putRequest(url, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * deleteSetupParameter
   * @param {serviceId}
   * @returns {data: {status, msg}, statusCode}
   */
   async deleteSetUpParameter(opts) {
    await this.validate();
    await this.validator.deleteSetUpParameter(opts);
    const url = `/setup/${serviceId}`;
    const resp = this.request.deleteRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }


  /**
   * getServiceIds
   * @param {serviceId}
   * @returns {data: {status, msg}, statusCode}
   */
   async getServiceIds(opts) {
    await this.validate();
    const url = `/setup/serviceIds`;
    const resp = this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Admin;
