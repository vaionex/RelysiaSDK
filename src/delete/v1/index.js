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
   * delete user account
   * @param {object} opts
   * @return {object}
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
   *@param {object} opts
   * @return {object}
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
   *@param {object} opts
   * @return {object}
   */
  async notificationToken(opts) {
    await this.validate();
    await this.validator.deletenotificationToken(opts);
    const url = `/notificationToken/${opts.userId}`;
    const headers = {
      authToken: this.auth.authToken,
    };
    if (opts.walletId) headers.walletId = opts.walletId;
    const resp = this.request.deleteRequest(url, opts.data, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = V1;
