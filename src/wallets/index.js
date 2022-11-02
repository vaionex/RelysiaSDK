const V1 = require('./v1/index');
const V2 = require('./v2/index');

class Wallet {
  constructor(auth) {
    this.v1 = new V1(auth);
    this.v2 = new V2(auth);
  }
}

module.exports = Wallet;
