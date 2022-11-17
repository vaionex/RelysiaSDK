const V1 = require('./v1/index');
const V2 = require('./v2/index');

class Wallet {
  constructor(auth, serviceId) {
    this.v1 = new V1(auth, serviceId);
    this.v2 = new V2(auth, serviceId);
  }
}

module.exports = Wallet;
