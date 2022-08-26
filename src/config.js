exports.baseURL = "https://api.relysia.com";
const { default: axios } = require("axios");

const testFunction = async () => {
  return await axios.get('https://www.google.com');
};

const a = () => {
  testFunction()
    .then(() => {
      console.log("then");
    })
    .catch((e) => {
      console.log("catch", e);
    });
};

const b = async () => {
    try {
        await testFunction();
        console.log("fullfilled")
    } catch(ee) {
        console.log("errr", ee)
    }
}

a();
b();