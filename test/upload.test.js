import chai from 'chai';
import Fetch from '../src/axios.js';
import {baseURL} from './config.js';
import RelysiaSDK from '../src/relysia-sdk.js';
const expect = chai.expect;

describe('Axios request test', function() {
  this.timeout(10000);
  let relysiaSDK;

  before(async function() {
    relysiaSDK = new RelysiaSDK();
  });

  it('Should authenticate user and set authToken - endpoint /v1/auth', async () => {
    const data = {
      serviceID: '',
      email: "test009@gmail.com",
      password: "123456"
    };
    await relysiaSDK.auth(data);
    expect(relysiaSDK.authToken).to.be.a('string');
    console.log(relysiaSDK.authToken);
  });

  it('Should successfully send request', async () => {
    const opts = {
      serviceId: '',
      body: {
        type: "media",
        fileUrl: "https://upload.wikimedia.org/wikipedia/en/9/95/Test_image.jpg",
        fileName: "string",
        notes: "max notes text length allowed 100K"
      }
    };
    try {
      const resp = await relysiaSDK.upload(opts);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  });
});
