const Request = require('../../request');
const validator = require('./validator');

class V1 {
  constructor(config) {
    this.authToken = config.authToken;
    this.serviceId = config.serviceId;
    this.validator = validator;
    this.request = new Request();
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  getAuthToken() {
    return this.authToken;
  }

  async validate() {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
  }

  /**
   * logged in and return token
   * @param {object} opts
   * @return {object}
   **/
  async auth(opts) {
    await this.validator.auth(opts);
    const url = `/auth`;
    const headers = {};
    if (this.serviceId) headers.serviceId = this.serviceId;
    const data = {};
    data.email = opts.email;
    data.password = opts.password;
    const resp = await this.request.postRequest(url, data);
    if (resp instanceof Error) throw resp;
    this.setAuthToken(resp.data.token);
    return resp.data;
  }

  /**
   * create a user
   *@param {object} opts
   * @return {object}
   **/
  async signUp(opts) {
    await this.validator.signUp(opts);
    const url = `/signUp`;
    const headers = {};
    if (this.serviceId) headers.serviceId = this.serviceId;
    const data = {};
    data.email = opts.email;
    data.password = opts.password;
    if (opts.photo) data.photo = opts.photo;
    if (opts.displayName) data.displayName = opts.displayName;

    const resp = await this.request.postRequest(url, data, headers);
    if (resp instanceof Error) throw resp;
    this.setAuthToken(resp.data.token);
    return resp.data;
  }

  /**
   * reset the pasword
   * @param {object} opts
   * @return {object}
   **/
  async resetPassword(opts) {
    await this.validator.resetPassword(opts);
    const url = `/reset/password`;
    const data = {};
    const headers = {};
    if (this.serviceId) headers.serviceId = this.serviceId;
    data.email = opts.email;
    const resp = await this.request.postRequest(url, data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * send otp to provided email
   *@param {object} opts
   * @return {object}
   **/
  async sendOtp(opts) {
    await this.validate();
    await this.validator.sendOTP(opts);
    const url = `/sendOTP`;
    const headers = {
      authToken: this.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    const data = {};
    data.from = opts.from;
    data.to = opts.to;
    data.message = opts.message;
    const resp = await this.request.postRequest(url, data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * validate the otp
   * @param {object} opts
   * @return {object}
   **/
  async validateOtp(opts) {
    await this.validate();
    await this.validator.validateOtp(opts);
    const url = `/validateOTP`;
    const headers = {
      authToken: this.authToken,
    };
    if (this.serviceId) headers.serviceId = this.serviceId;
    const data = {};
    data.to = opts.to;
    data.otp = opts.otp;
    const resp = await this.request.postRequest(url, data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;
