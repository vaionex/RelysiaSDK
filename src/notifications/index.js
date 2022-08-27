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
   * @param { userid,walletid, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.notificationToken(opts);
    const url = `/notificationToken/${opts.userid}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.userid) headers.userid = opts.userid;
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.putRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * send a notification
   * @param { userid,walletid, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async sendNotification(opts) {
    await this.validate();
    await this.validator.sendNotification(opts);
    const url = `/sendNotification`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    if (opts.serviceid) headers.serviceid = opts.serviceid;
    const resp = await this.request.postRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Notifications;
