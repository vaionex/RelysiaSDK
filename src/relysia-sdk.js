const Authentication = require('./authentication');
const User = require('./user');
const Wallet = require('./wallets');
const FeeManager = require('./feeManager');
const Utility = require('./utility');
const Paymail = require('./paymail');
const Notifications = require('./notifications');
const Delete = require('./delete');
const Contracts = require('./contracts');
const Transaction = require('./transactions/index');

class RelysiaSDK {
  constructor(config) {
    this.authentication = new Authentication(config);
    this.contracts = new Contracts(this.authentication.auth);
    this.delete = new Delete(this.authentication.auth);
    this.feeManager = new FeeManager(this.authentication.auth);
    this.notification = new Notifications(this.authentication.auth);
    this.paymail = new Paymail(this.authentication.auth);
    this.transaction = new Transaction(this.authentication.auth),
    this.user = new User(this.authentication.auth);
    this.utility = new Utility(this.authentication.auth);
    this.wallet = new Wallet(this.authentication.auth);
  }
}

module.exports = RelysiaSDK;
