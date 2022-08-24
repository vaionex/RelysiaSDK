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

class RelysiaSDK {
  constructor(config) {
    this.validator = validator;
    this.auth = new Auth(config);
    this.authToken = this.auth.getAuthToken();
    this.user = new User(this.authToken);
    this.wallet = new Wallet(this.authToken);
    this.feeManager = new FeeManager(this.authToken);
    this.utility = new Utility(this.authToken);
    this.paymail = new Paymail(this.authToken);
    this.notifications = new Notifications(this.authToken);
    this.delete = new Delete(this.authToken);
    this.admin = new Admin(this.authToken);
    this.paymail = new Paymail(this.authToken);
    this.oauth = new Oauth(this.authToken);
    this.contracts = new Contracts(this.authToken);
  }
}

module.exports = RelysiaSDK;
