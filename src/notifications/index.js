const validator = require("./validator");
const Request = require("../request");

class Notifications {
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
   * update notification token
   * @param { userId,walletID, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.notificationToken(opts);
    const url = `/notificationToken/${opts.userId}`;
    const headers = {};
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
    const headers = {};
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Notifications;