const relysiaSDK = require('./');
const relysia = new relysiaSDK();
async function hello() {
  relysia.authentication.v1.auth({email: 'aditya@vaionex.com', password: '123456'}).then((e) => {
    relysia.wallet.v2.balance().then((e) => {
      console.log(e);
    });
  });
}

hello();
