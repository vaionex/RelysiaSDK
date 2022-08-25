const Request = require("../request");

class User {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }

  /**
   * return current user
   * @returns {data: {status, msg}, statusCode}
   */
  async getUserDetails() {
    if (!this.auth.authToken)
      throw new Error("You must logged In. Try calling auth() method first");
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
