const validator = require("./validator");
const Request = require("../request");

class Notifications {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * update notification token
   * @param { userId,walletID, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.notificationToken(opts);
    const url = `/notificationToken/${opts.userId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.userID) headers.userID = opts.userID;
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * send a notification
   * @param { userId,walletID, serviceid}
   * @returns {data: {status, msg}, statusCode}
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

module.exports = Notifications;
