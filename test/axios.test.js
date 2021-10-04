import chai from 'chai';
import Fetch from '../src/axios.js';
import {baseURL} from './config.js';
const expect = chai.expect;

describe('Axios request test', function() {
  this.timeout(10000);

  it('Should successfully send request', async () => {
    const url = `${baseURL}/v1/auth`;
    const headers = {};
    headers.accept = 'application/json';
    headers.email = 'shohidul@vaionex.com';
    headers.password = 'shohidul2021';
    const resp = await Fetch('get', url, headers);
    expect(resp).to.be.an('object');
  });
});
