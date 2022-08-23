const {baseURL} = require('../config');
const Axios = require('./axios');
const validator = require('./validator');
const Auth = require('./auth');
const User = require('./user');
const Wallet = require('./wallets');

class RelysiaSDK {
  constructor(config) {
    this.validator = validator;
    this.auth = new Auth(config);
    this.authToken = this.auth.getAuthToken();
    this.user = new User(this.authToken);
    this.wallet = new Wallet(this.authToken);
  }

  async stasTokenBalance(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.stasTokenBalance(opts);
    const url = `${baseURL}/v1/stasTokenBalance`;
    const headers = {};
    headers.accept = 'application/json';
    headers.authToken = this.authToken;
    headers.walletId = opts.walletId;
    const resp = await Axios('get', url, headers);
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
    const resp = await Axios('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async URI(opts) {
    await this.validator.URI(opts);
    const url = `${baseURL}/v1/URI`;
    const headers = {};
    headers.accept = 'application/json';
    headers.uri = opts.uri;
    const resp = await Axios('get', url, headers);
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
    const resp = await Axios('post', url, headers, opts.data);
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
    const resp = await Axios('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async feeMetricsBeta() {
    const url = `${baseURL}/v1/feeMetricsBeta`;
    const headers = {};
    headers.accept = '*/*';
    await Axios('get', url, headers);
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
    const resp = await Axios('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async tokenDetails(opts) {
    await this.validator.tokenDetails(opts);
    const url = `${baseURL}/v1/tokenDetails`;
    const headers = {};
    headers.accept = 'application/json';
    headers.tokenID = opts.tokenID;
    const resp = await Axios('get', url, headers);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async tokensCount(opts) {
    await this.validator.tokensCount(opts);
    const url = `${baseURL}/v1/tokensCount`;
    const headers = {};
    headers.accept = 'application/json';
    headers.tokenID = opts.address;
    const resp = await Axios('get', url, headers);
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
    const resp = await Axios('post', url, headers, opts.body);
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
    const resp = await Axios('post', url, headers, opts.data);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async post(opts) {
    if (!this.authToken) throw new Error('You must logged In. Try calling auth() method first');
    await this.validator.post(opts);
    const url = `${baseURL}/post`;
    const headers = {};
    headers.accept = '*/*';
    headers['Content-Type'] = 'application/json';
    if (opts.serviceID) headers.serviceID = opts.serviceID;
    if (opts.walletID) headers.walletID = opts.walletID;
    headers.authToken = this.authToken;
    const resp = await Axios('post', url, headers, opts.body);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }

  async transpile(base64SourceCode) {
    const body = {
      sourceCode: base64SourceCode,
    };
    await this.validator.transpile(body);
    const url = `${baseURL}/v1/transpile`;
    const headers = {};
    headers.accept = '*/*';
    headers['Content-Type'] = 'application/json';
    const resp = await Axios('post', url, headers, body);
    if (resp instanceof Error) throw resp;
    return resp.data;
  }
}

module.exports = RelysiaSDK;
