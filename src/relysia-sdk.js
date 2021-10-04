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
}

export default RelysiaSDK;
