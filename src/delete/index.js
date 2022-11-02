const V1 = require('./v1/index');

class Delete {
  constructor(auth) {
    this.v1 = new V1(auth);
  }
}
module.exports = Delete;
