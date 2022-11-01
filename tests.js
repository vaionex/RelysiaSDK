const relysiaSDK = require('./main');
const relysia = new relysiaSDK();
relysia.wallet.leaderBoard('22ffad9cf5cd41bd513ba25adac4d278a3fdaafe-nsTestAdityaUnique1000').then((e) => {
  console.log(e);
});
