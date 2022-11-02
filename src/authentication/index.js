const V1 = require('./v1/index');

class Authentication {
  constructor(config) {
    this.v1 = new V1(config);
  }
}
module.exports = Authentication;
