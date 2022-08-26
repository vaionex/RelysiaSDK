const RelysiaSDK = require('../src/relysia-sdk');

describe('post method testing', async function() {
  const testUser = {
    email: 'shohidul@vaionex.com',
    password: '---',
  };
  let relysiaSDK;

  before(async function() {
    relysiaSDK = new RelysiaSDK();
    await relysiaSDK.auth(testUser);
  });

  it('Should post something', async function() {
    const response = await relysiaSDK.post({
      body: {
        notes: ['this is first text'],
      },
    });
    console.log(response);
  });

  it('asd', (done) => {
    const a = new RelysiaSDK();
    a.auth.validateOtp().then(() => {
      console.log('then')
      done()
    }).catch(() => {
      console.log('catch')
      done()
    });
  })

});
