const {baseURL} = require('./config');
const Fetch = require('./axios');
const validator = require('./validator');

class RelysiaSDK {
  constructor(config) {
    this.authToken = config && config.authToken;
    this.validator = validator;
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  async auth(opts) {
    await this.validator.auth(opts);
    const url = `${baseURL}/v1/auth`;
    const headers = {};
    headers.accept = 'application/json';
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const data = {};
    data.email = opts.email;
    data.password = opts.password;
    const resp = await Fetch('post', url, headers, data);
    if (resp instanceof Error) throw resp;
    this.authToken = resp.data.token;
    return resp.data;
  }

  async getUserDetails() {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    const url = `${baseURL}/v1/user`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async createWallet(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    if (!opts.walletTitle) opts.walletTitle = 'default';

    await this.validator.createWallet(opts);
    const url = `${baseURL}/v1/createWallet`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletTitle) headers.walletTitle = opts.walletTitle;
    if (opts.type) headers.type = opts.type;
    if (opts.walletLogo) headers.walletLogo = opts.walletLogo;
    if (opts.walletPassword) headers.walletPassword = opts.walletPassword;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async metrics(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.metrics(opts);
    const url = `${baseURL}/v1/metrics`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async address(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.address(opts);
    const url = `${baseURL}/v1/address`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async allAddresses(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.allAddresses(opts);
    const url = `${baseURL}/v1/allAddresses`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async balance(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.balance(opts);
    const url = `${baseURL}/v1/balance`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.currency) headers.currency = opts.currency;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async stasTokenBalance(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.stasTokenBalance(opts);
    const url = `${baseURL}/v1/stasTokenBalance`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    headers.walletId = opts.walletId;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async history(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.history(opts);
    const url = `${baseURL}/v1/history`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.nextPageToken) headers.nextPageToken = opts.nextPageToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    if (opts.type) headers.type = opts.type;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async wallets(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.wallets(opts);
    const url = `${baseURL}/v1/wallets`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.oauth) headers.oauth = opts.oauth;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async mnemonic(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    if (!opts) opts = {};
    await this.validator.mnemonic(opts);
    const url = `${baseURL}/v1/mnemonic`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async currencyConversion(opts) {
    await this.validator.currencyConversion(opts);
    const url = `${baseURL}/v1/currencyConversion`;
    const headers = {};
    headers.accept = 'application/json';
    headers.satoshis = opts.satoshis;
    headers.currency = opts.currency;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async URI(opts) {
    await this.validator.URI(opts);
    const url = `${baseURL}/v1/URI`;
    const headers = {};
    headers.accept = 'application/json';
    headers.uri = opts.uri;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async send(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.send(opts);
    const url = `${baseURL}/v1/send`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = await Fetch('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async pay(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.pay(opts);
    const url = `${baseURL}/v1/pay`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    const resp = await Fetch('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async feeMetricsBeta() {
    const url = `${baseURL}/v1/feeMetricsBeta`;
    const headers = {};
    headers.accept = '*/*';
    await Fetch('get', url, headers);
  }

  async issue(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.issue(opts);
    const url = `${baseURL}/v1/issue`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.protocol) headers.protocol = opts.protocol;
    const resp = await Fetch('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async tokenDetails(opts) {
    await this.validator.tokenDetails(opts);
    const url = `${baseURL}/v1/tokenDetails`;
    const headers = {};
    headers.accept = 'application/json';
    headers.tokenID = opts.tokenID;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async tokensCount(opts) {
    await this.validator.tokensCount(opts);
    const url = `${baseURL}/v1/tokensCount`;
    const headers = {};
    headers.accept = 'application/json';
    headers.tokenID = opts.address;
    const resp = await Fetch('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async upload(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.upload(opts);
    const url = `${baseURL}/upload`;
    const headers = {};
    headers.accept = '*/*';
    headers['Content-Type'] = 'application/json';
    if (opts.serviceId) headers.serviceId = opts.serviceId;
    if (opts.walletID) headers.walletID = opts.walletID;
    headers.authToken = this.authToken;
    const resp = await Fetch('post', url, headers, opts.body);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async drop(opts) {
    await this.validator.drop(opts);
    const url = `${baseURL}/v1/drop`;
    const headers = {};
    headers.accept = 'application/json';
    headers.secretKey = opts.secretKey;
    headers.privateKey = opts.privateKey;
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    const resp = await Fetch('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = RelysiaSDK;
