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
    this.contracts = new Contracts(this.authentication.auth, config?.serviceId);
    this.delete = new Delete(this.authentication.auth, config?.serviceId);
    this.feeManager = new FeeManager(this.authentication.auth, config?.serviceId);
    this.notification = new Notifications(this.authentication.auth, config?.serviceId);
    this.paymail = new Paymail(this.authentication.auth, config?.serviceId);
    this.transaction = new Transaction(this.authentication.auth, config?.serviceId),
    this.user = new User(this.authentication.auth, config?.serviceId);
    this.utility = new Utility(this.authentication.auth, config?.serviceId);
    this.wallet = new Wallet(this.authentication.auth, config?.serviceId);
  }
}

module.exports = RelysiaSDK;
