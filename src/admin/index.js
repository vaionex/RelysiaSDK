const validator = require("./validator");
const Request = require("../request");

class Admin {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * Migrate Token
   * @param { walletid}
   * @returns {data: {status, msg}, statusCode}
   */
  async migrateToken(opts) {
    await this.validate();
    await this.validator.migrateToken(opts);
    const url = `/migrateToken`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.postRequest(url, {}, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * Generate a domain verification Token
   * @param {userid}
   * @returns {data: {status, msg}, statusCode}
   */
  async generateToken(opts) {
    await this.validate();
    await this.validator.generateToken(opts);
    const url = `/domain/generateToken`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.userid) headers.userid = opts.userid;
    const resp = await this.request.postRequest(url, opts.data, headers, true);

    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * verify domain ownership
   * @param { userid}
   * @returns {data: {status, msg}, statusCode}
   */
  async verifyToken(opts) {
    await this.validate();
    await this.validator.verifyToken(opts);
    const url = `/domain/${opts.userid}/verifyToken`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.postRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * setup
   * @param { userid}
   * @returns {data: {status, msg}, statusCode}
   */
  async setUp(opts) {
    await this.validate();
    await this.validator.setUp(opts);
    const url = `/setup`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.postRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get setup
   * @param {serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async getSetupByserviceid(opts) {
    await this.validate();
    await this.validator.getSetupByserviceid(opts);
    const url = `/setup/${opts.serviceid}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * update setup
   * @param {serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async updateSetupByserviceid(opts) {
    await this.validate();
    await this.validator.updateSetupByserviceid(opts);
    const url = `/setup/${opts.serviceid}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.putRequest(url, opts.data, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * delete a setup
   * @param {serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async deleteSetupByserviceid(opts) {
    await this.validate();
    await this.validator.deleteSetupByserviceid(opts);
    const url = `/setup/${opts.serviceid}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.deleteRequest(url, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * get setup by service ids
   * @param {serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async getSetupByserviceids() {
    await this.validate();
    const url = `/setup/serviceids`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.getRequest(url, headers, true);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Admin;
