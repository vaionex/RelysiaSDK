const Request = require("../request");
const validator = require("./validator");

class Auth {
  constructor(config) {
    this.authToken = config && config.authToken;
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
   * @param {email, password}
   * @returns {data: {status, msg}, statusCode}
   **/
  async auth(opts) {
    await this.validator.auth(opts);
    const url = `/auth`;
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const data = {};
    data.email = opts.email;
    data.password = opts.password;
    const resp = await this.request.postRequest(url, data);
    if (resp instanceof Error) throw resp;
    setAuthToken(resp.data.token);
    return resp.data;
  }

  /**
   * create a user
   * @param {email, password}
   * @returns {data: {status, msg}, statusCode}
   **/
  async signUp(opts) {
    await this.validator.signUp(opts);
    const url = `/signUp`;
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const data = {};
    data.email = opts.email;
    data.password = opts.password;
    const resp = await this.request.postRequest(url, data);
    if (resp instanceof Error) throw resp;
    setAuthToken(resp.data.token);
    return resp.data;
  }

  /**
   * reset the pasword
   * @param {email, password}
   * @returns {data: {status, msg}, statusCode}
   **/
  async resetPassword(opts) {
    await this.validator.resetPassword(opts);
    const url = `/reset/password`;
    const data = {};
    data.email = opts.email;
    const resp = await this.request.postRequest(url, data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * send otp to provided email
   * @param {from, to, message}
   * @returns {data: {status, msg}, statusCode}
   **/
  async sendOtp(opts) {
    await this.validate();
    await this.validator.sendOTP(opts);
    const url = `/sendOTP`;
    const headers = {
      authToken: this.authToken,
    };
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
   * @param {to, otp}
   * @returns {data: {status, msg, email}, statusCode}
   **/
  async validateOtp(opts) {
    await this.validate();
    await this.validator.validateOtp(opts);
    const url = `/validateOTP`;
    const headers = {
      authToken: this.authToken,
    };
    const data = {};
    data.to = opts.to;
    data.otp = opts.otp;
    const resp = await this.request.postRequest(url, data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Auth;