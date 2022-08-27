const validator = require("./validator");
const Request = require("../request");

class Delete {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * delete user account
   * @param {}
   * @returns {}
   */
  async deleteUserAccount() {
    await this.validate();
    const url = `/user`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.deleteRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * delete all wallets
   * @param {}
   * @returns {}
   */
  async deleteAllWallets() {
    await this.validate();
    const url = `/wallets`;
    const headers = {
      authToken: this.auth.authToken,
    };
    const resp = await this.request.deleteRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * update notification token
   * @param { userid,walletid, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.deleteNotificationToken(opts);
    const url = `/notificationToken/${opts.userid}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletid) headers.walletid = opts.walletid;
    const resp = await this.request.deleteRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Delete;
