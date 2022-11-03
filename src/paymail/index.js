const V1 = require('./v1/index');


class Paymail {
  constructor(auth) {
    this.v1 = new V1(auth);
  }
}
module.exports = Paymail;
