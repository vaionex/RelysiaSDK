import {baseURL} from '../test/config.js';
import Fetch from './axios.js';
import validator from './validator.js';

class RelysiaSDK {
  constructor(config) {
    this.authToken = config && config.authToken;
    this.serviceId = config && config.serviceId;
    this.validator = validator;
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setServiceId(serviceId) {
    this.serviceId = serviceId;
  }

  async auth(opts) {
    await this.validator.auth(opts);
    const url = `${baseURL}/v1/auth`;
    const headers = {};
    headers.accept = 'application/json';
    headers.email = opts.email;
    headers.password = opts.password;
    const resp = await Fetch('get', url, headers);
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
}

export default RelysiaSDK;
