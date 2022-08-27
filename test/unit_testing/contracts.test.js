const sinon = require("sinon");
const { default: axios } = require("axios");
const Contracts = require("../../src/contracts");

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

describe("Contracts functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const contract = new Contracts(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("issue function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = contract.issue(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "walletid",
        data: {},
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = contract.issue(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        protocol: "protocol",
        data: {},
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await contract.issue(opts);
      successAssertion(resp, data);
    });
  });

  describe("getTokenDetails function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"id" is required`;

      const resp = contract.getTokenDetails(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      const opts = {
        id: "id",
      };
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = contract.getTokenDetails(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const opts = {
        id: "id",
      };
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await contract.getTokenDetails(opts);
      successAssertion(resp, data);
    });
  });

  describe("redeem function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = contract.redeem(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        data: {
          dataArray: [
            {
              tokenId: "tokenId",
              amount: 100,
              sn: "sn",
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = contract.redeem(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        data: {
          dataArray: [
            {
              tokenId: "tokenId",
              amount: 100,
              sn: "sn",
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await contract.redeem(opts);
      successAssertion(resp, data);
    });
  });
});
