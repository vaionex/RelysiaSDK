const Request = require("../request");

class User {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  async validate() {
    if (!this.auth.authToken) await this.auth.auth();
  }

  /**
   * return current user
   * @returns {data: {status, msg}, statusCode}
   */
  async getUserDetails() {
    await validate();
    const url = `/user`;
    const headers = {
      authToken: this.auth.authToken
    }
    const resp = await this.request.getRequest(url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = User;
