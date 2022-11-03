const V1 = require('./v1/index');
class Contracts {
  constructor(auth) {
    this.v1 = new V1(auth);
  }
}

module.exports = Contracts;
