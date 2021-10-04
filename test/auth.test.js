import chai from 'chai';
import RelysiaSDK from '../src/relysia-sdk.js';
const expect = chai.expect;

describe('Auth /v1/auth endpoint test', function() {
  this.timeout(10000);
  let relysiaSDK;

  before(async function() {
    relysiaSDK = new RelysiaSDK();
  });

  it('Should authenticate user and set authToken', async () => {
    const data = {
      email: 'shohidul@vaionex.com',
      password: 'shohidul2021',
    };
    await relysiaSDK.auth(data);
    expect(relysiaSDK.authToken).to.be.a('string');
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
});
