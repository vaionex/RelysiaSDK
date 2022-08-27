const sinon = require("sinon");
const { default: axios } = require("axios");
const Wallets = require("../../src/wallets");

const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const successAssertion = (response, obj) => {
  expect(response).to.be.an("object");
  expect(response).to.eqls(obj);
};

const failureAssertion = async (response, msg = "") => {
  await expect(response)
    .to.eventually.be.rejectedWith(msg)
    .and.be.an.instanceOf(Error);
};

describe("Wallets functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const wallets = new Wallets(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("createWallet function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"walletTitle" is required`;

      const resp = wallets.createWallet(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletTitle: "walletTitle",
        type: "type",
        walletLogo: "walletLogo",
        walletPassword: "walletPassword",
        walletPassword: "walletPassword",
        serviceid: "serviceid",
      };

      const resp = wallets.createWallet(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletTitle: "walletTitle",
        type: "type",
        walletLogo: "walletLogo",
        walletPassword: "walletPassword",
        walletPassword: "walletPassword",
        serviceid: "serviceid",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.createWallet(opts);
      successAssertion(resp, data);
    });
  });

  describe("getMetrics function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };

      const resp = wallets.getMetrics(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getMetrics(opts);
      successAssertion(resp, data);
    });
  });

  describe("getAddress function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };

      const resp = wallets.getAddress(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getAddress(opts);
      successAssertion(resp, data);
    });
  });

  describe("getAllAddresses function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };

      const resp = wallets.getAllAddresses(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getAllAddresses(opts);
      successAssertion(resp, data);
    });
  });

  describe("getAllAddresses function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };

      const resp = wallets.getAllAddresses(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getAllAddresses(opts);
      successAssertion(resp, data);
    });
  });

  describe("getBalance function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        currency: "USD",
      };

      const resp = wallets.getBalance(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        currency: "USD",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getBalance(opts);
      successAssertion(resp, data);
    });
  });

  describe("getHistory function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        version: "1",
      };

      const resp = wallets.getHistory(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        version: "1",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getHistory(opts);
      successAssertion(resp, data);
    });
  });

  describe("getWallets function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        serviceid: "serviceid",
        oauth: "oauth",
      };

      const resp = wallets.getWallets(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        oauth: "oauth",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getWallets(opts);
      successAssertion(resp, data);
    });
  });

  describe("getWallets function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        serviceid: "serviceid",
        oauth: "oauth",
      };

      const resp = wallets.getWallets(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        oauth: "oauth",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getWallets(opts);
      successAssertion(resp, data);
    });
  });

  describe("getMnemonic function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        serviceid: "serviceid",
        walletid: "walletid",
      };

      const resp = wallets.getMnemonic(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        walletid: "walletid",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.getMnemonic(opts);
      successAssertion(resp, data);
    });
  });

  describe("deleteWallet function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};

      const resp = wallets.deleteWallet(opts);
      await failureAssertion(resp);
    });

    it("should throw error when options are valid and axios.delete returns invalid status", async () => {
      axios.delete.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
      };

      const resp = wallets.deleteWallet(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.delete returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
      };
      axios.delete.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await wallets.deleteWallet(opts);
      successAssertion(resp, data);
    });
  });
});
