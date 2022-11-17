const V1 = require('./v1/index');


class Paymail {
  constructor(auth, serviceId) {
    this.v1 = new V1(auth, serviceId);
  }
}
module.exports = Paymail;
