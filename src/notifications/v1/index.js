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
   * update notification token
   * @param {object} opts
   * @return {object}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.notificationToken(opts);
    const url = `/notificationToken/${opts.userId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * send a notification
   *@param {object} opts
   * @return {object}
   */
  async sendNotification(opts) {
    await this.validate();
    await this.validator.sendNotification(opts);
    const url = `/sendNotification`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;
