import chai from 'chai';
import RelysiaSDK from '../src/relysia-sdk.js';
const expect = chai.expect;

describe('RelysiaSDK module test', function() {
  this.timeout(10000);
  let relysiaSDK;

  before(async function() {
    relysiaSDK = new RelysiaSDK();
  });

  it('Should not process request - Invalid payload', async () => {
    relysiaSDK.authToken = undefined;
    const data = {
      email: 'shohidul@vaionex.com',
    };
    try {
      await relysiaSDK.auth(data);
    } catch (err) {
      expect(relysiaSDK.authToken).to.not.be.a('string');
    }
  });

  it('Should not process request - Incorrect email & password combination', async () => {
    relysiaSDK.authToken = undefined;
    const data = {
      email: 'shohidul@vaionex.com',
      password: '2021',
    };
    try {
      await relysiaSDK.auth(data);
    } catch (err) {
      expect(relysiaSDK.authToken).to.not.be.a('string');
    }
  });

  it('Should authenticate user and set authToken - endpoint /v1/auth', async () => {
    const data = {
      email: 'shohidul@vaionex.com',
      password: 'shohidul2021',
    };
    await relysiaSDK.auth(data);
    expect(relysiaSDK.authToken).to.be.a('string');
  });

  it('Should return the user details - endpoint /v1/user', async () => {
    const resp = await relysiaSDK.getUserDetails();
    expect(resp).to.be.an('object');
  });

  it('Should create a wallet - endpoint /v1/createWallet', async () => {
    try {
      const resp = await relysiaSDK.createWallet();
      expect(resp).to.be.an('object');
    } catch (err) {
      // console.log(err.response);
    }
  });

  it('Should return the metrics - endpoint /v1/metrics', async () => {
    const resp = await relysiaSDK.metrics();
    expect(resp).to.be.an('object');
  });

  it('Should return the address - endpoint /v1/address', async () => {
    const resp = await relysiaSDK.address();
    expect(resp).to.be.an('object');
  });

  it('Should return all the addresses - endpoint /v1/allAddresses', async () => {
    const resp = await relysiaSDK.allAddresses();
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('addressess');
  });

  it('Should return the balance - endpoint /v1/balance', async () => {
    const resp = await relysiaSDK.balance();
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('totalBalance');
  });

  it('Should return the stasTokenBalance - endpoint /v1/stasTokenBalance', async () => {
    const opts = {'walletId': '00000000-0000-0000-0000-000000000000'};
    const resp = await relysiaSDK.stasTokenBalance(opts);
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('data');
  });

  it('Should return the history - endpoint /v1/history', async () => {
    const resp = await relysiaSDK.history();
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('histories');
  });

  it('Should return the wallets - endpoint /v1/wallets', async () => {
    const resp = await relysiaSDK.wallets();
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('data');
    expect(resp.data).to.be.an('array');
    expect(resp.data[0]).to.be.an('object');
    expect(resp.data[0]).to.have.property('walletID');
  });

  it('Should return the mnemonic - endpoint /v1/mnemonic', async () => {
    const resp = await relysiaSDK.mnemonic();
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('mnemonic');
  });

  it('Should return convert the currency - endpoint /v1/currencyConversion', async () => {
    const resp = await relysiaSDK.currencyConversion({satoshis: '5000', currency: 'USD'});
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('balance');
  });
});
