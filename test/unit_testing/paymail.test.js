const sinon = require("sinon");
const { default: axios } = require("axios");
const Paymail = require("../../src/paymail");

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

describe("Paymail functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const paymail = new Paymail(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "patch");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getPaymailById function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"serviceid" is required`;

      const resp = paymail.getPaymailById(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        serviceid: "serviceid",
        paymailId: "paymaiLId",
      };

      const resp = paymail.getPaymailById(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        paymailId: "paymaiLId",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.getPaymailById(opts);
      successAssertion(resp, data);
    });
  });

  describe("updatePaymail function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"walletid" is required`;

      const resp = paymail.updatePaymail(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.put returns invalid status", async () => {
      axios.put.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        serviceid: "serviceid",
        walletid: "walletid",
        data: {
          newPaymailId: "newPaymailId",
        },
      };

      const resp = paymail.updatePaymail(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.put returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        walletid: "walletid",
        data: {
          newPaymailId: "newPaymailId",
        },
      };
      axios.put.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.updatePaymail(opts);
      successAssertion(resp, data);
    });
  });

  describe("activatePaymail function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"walletid" is required`;

      const resp = paymail.activatePaymail(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        data: {
          activate: true,
        },
      };

      const resp = paymail.activatePaymail(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        walletid: "walletid",
        data: {
          activate: true,
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.activatePaymail(opts);
      successAssertion(resp, data);
    });
  });

  describe("getPaymailBsv function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"paymail" is required`;

      const resp = paymail.getPaymailBsv(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        paymail: "paymail",
      };

      const resp = paymail.getPaymailBsv(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        paymail: "paymail",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.getPaymailBsv(opts);
      successAssertion(resp, data);
    });
  });

  describe("bsvAddressRequest function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"paymail" is required`;

      const resp = paymail.bsvAddressRequest(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        paymail: "paymail",
        data: {},
      };

      const resp = paymail.bsvAddressRequest(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        paymail: "paymail",
        data,
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.bsvAddressRequest(opts);
      successAssertion(resp, data);
    });
  });

  describe("bsvVerifyPubkeyRequest function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"paymail" is required`;

      const resp = paymail.bsvVerifyPubkeyRequest(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        paymail: "paymail",
        pubkey: "pubkey",
      };

      const resp = paymail.bsvVerifyPubkeyRequest(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        paymail: "paymail",
        pubkey: "pubkey",
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.bsvVerifyPubkeyRequest(opts);
      successAssertion(resp, data);
    });
  });

  describe("bsvTransactionRequest function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"paymail" is required`;

      const resp = paymail.bsvTransactionRequest(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        paymail: "paymail",
        data: {
          metadata: {},
        },
      };

      const resp = paymail.bsvTransactionRequest(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        paymail: "paymail",
        data: {
          metadata: {},
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.bsvTransactionRequest(opts);
      successAssertion(resp, data);
    });
  });

  describe("bsvP2PRequest function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"paymail" is required`;

      const resp = paymail.bsvP2PRequest(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        paymail: "paymail",
        data: {
          satoshis: 0,
        },
      };

      const resp = paymail.bsvP2PRequest(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        paymail: "paymail",
        data: {
          satoshis: 0,
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.bsvP2PRequest(opts);
      successAssertion(resp, data);
    });
  });

  describe("wellKnownBsv function functionality test", () => {
    it("should throw error when axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      
      const resp = paymail.wellKnownBsv();
      await failureAssertion(resp);
    });

    it("should return success when axios.get returns valid data", async () => {
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await paymail.wellKnownBsv();
      successAssertion(resp, data);
    });
  });
});
