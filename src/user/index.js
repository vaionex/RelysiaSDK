const Request = require("../request");

class User {
  constructor(token) {
    this.authToken = token;
    this.validator = validator;
    this.request = new Request(token);
  }

  /**
   * return current user
   * @returns {data: {status, msg}, statusCode}
   */
  async getUserDetails() {
    if (!this.authToken)
      throw new Error("You must logged In. Try calling auth() method first");
    const url = `/user`;
    const resp = await this.request.getRequest(url);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = User;
