const Authentication = require('./authentication');
const User = require('./user');
const Wallet = require('./wallets');
const FeeManager = require('./feeManager');
const Utility = require('./utility');
const Paymail = require('./paymail');
const Notifications = require('./notifications');
const Delete = require('./delete');
const Contracts = require('./contracts');

class RelysiaSDK {
  constructor(config) {
    this.authentication = new Authentication(config);
    this.user = new User(this.auth);
    this.wallet = new Wallet(this.auth);
    this.feeManager = new FeeManager(this.auth);
    this.utility = new Utility(this.auth);
    this.paymail = new Paymail(this.auth);
    this.notifications = new Notifications(this.auth);
    this.delete = new Delete(this.auth);
    this.admin = new Admin(this.auth);
    this.paymail = new Paymail(this.auth);
    this.oauth = new Oauth(this.auth);
    this.contracts = new Contracts(this.auth);
  }
}

module.exports = RelysiaSDK;
