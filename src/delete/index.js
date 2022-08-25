const validator = require("./validator");
const Request = require("../request");

class Delete {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken)
      throw new Error("You must logged In. Try calling auth() method first");
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
    const resp = this.request.deleteRequest(url, headers);
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
    const resp = this.request.deleteRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  /**
   * update notification token
   * @param { userId,walletID, serviceid}
   * @returns {data: {status, msg}, statusCode}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.deletenotificationToken(opts);
    const url = `/notificationToken/${opts.userId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = this.request.deleteRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = Delete;
