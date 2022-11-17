const V1 = require('./v1/index');

class Utility {
  constructor(auth, serviceId) {
    this.v1 = new V1(auth, serviceId);
  }
}
module.exports = Utility;
