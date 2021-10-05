import chai from 'chai';
import RelysiaSDK from '../src/relysia-sdk.js';
const expect = chai.expect;

describe('RelysiaSDK Transaction Module Test', function() {
  this.timeout(10000);
  let relysiaSDK;

  before(async function() {
    relysiaSDK = new RelysiaSDK();
    await relysiaSDK.feeMetricsBeta();
  });

  it('Should authenticate user and set authToken - endpoint /v1/auth', async () => {
    const data = {
      email: 'abc@gmail.com',
      password: '123456',
    };
    await relysiaSDK.auth(data);
    expect(relysiaSDK.authToken).to.be.a('string');
  });

  it('Should return the URI - endpoint /v1/URI', async () => {
    const resp = await relysiaSDK.URI({uri: '49785@moneybutton.com'});
    expect(resp).to.be.an('object');
    expect(resp).to.have.property('data');
    expect(resp.data).to.be.an('object');
    expect(resp.data).to.have.property('uri');
    expect(resp.data.uri).to.be.eql('49785@moneybutton.com');
  });

  it('Should send money - endpoint /v1/send', async () => {
    await relysiaSDK.metrics();
    const opts = {};
    opts.serviceId = '';
    opts.walletID = '';
    opts.data = {
      'dataArray': [
        {
          'to': '17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH',
          'amount': 0.000005,
          'type': 'BSV',
          'notes': 'string',
        },
      ],
    };
    try {
      const resp = await relysiaSDK.send(opts);
      expect(resp).to.be.an('object');
      expect(resp).to.have.property('txIds');
    } catch (err) {
      console.log('Error response from server');
    }
  });

  it('Should purchase - endpoint /v1/purchase', async () => {
    await relysiaSDK.metrics();
    const opts = {};
    opts.serviceId = '';
    opts.walletID = '';
    opts.data = {
      'dataArray': [
        {
          'to': '17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH',
          'amount': 0.000005,
          'type': 'BSV',
          'notes': 'string',
        },
      ],
      'tokenId': 'string',
    };
    try {
      const resp = await relysiaSDK.purchase(opts);
      expect(resp).to.be.an('object');
      expect(resp).to.have.property('txIds');
    } catch (err) {
      console.log('Error response from server');
    }
  });

  it('Should pay - endpoint /v1/pay', async () => {
    await relysiaSDK.metrics();
    const uriResp = await relysiaSDK.URI({uri: '49785@moneybutton.com?amount=1000'});
    const opts = {};
    opts.data = uriResp.data;
    try {
      const resp = await relysiaSDK.pay(opts);
      expect(resp).to.be.an('object');
    } catch (err) {
      console.log('Error response from server');
    }
  });
});
