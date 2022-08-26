const Auth = require("./auth");
const User = require("./user");
const Wallet = require("./wallets");
const FeeManager = require("./feeManager");
const Utility = require("./utility");
const Paymail = require("./paymail");
const Notifications = require("./notifications");
const Delete = require("./delete");
const Admin = require("./admin");
const Paymail = require("./paymail");
const Contracts = require("./contracts");
const Oauth = require("./oauth");
const Transaction = require("./transactions");

class RelysiaSDK {
  constructor(config) {
    this.validator = validator;
    this.auth = new Auth(config);
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
    this.transaction = new Transaction(this.auth);
  }
}

module.exports = RelysiaSDK;
