const sinon = require("sinon");
const { default: axios } = require("axios");
const FeeManager = require("../../src/feeManager");

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

describe("FeeManager functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const feeManager = new FeeManager(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("initBeta function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"mnemonic" is required`;

      const resp = feeManager.initBeta(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        mnemonic: "mnemonic",
      };

      const resp = feeManager.initBeta(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {
        token: "token",
      };
      const opts = {
        mnemonic: "mnemonic",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await feeManager.initBeta(opts);
      successAssertion(resp, data);
    });
  });

  describe("feeMetricesBeta function functionality test", () => {

    it("should throw error when and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = feeManager.feeMetricesBeta();
      await failureAssertion(resp);
    });

    it("should return success when and axios.get returns valid data", async () => {
      const data = {
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await feeManager.feeMetricesBeta();
      successAssertion(resp, data);
    });
  });

  describe("feeAddressBeta function functionality test", () => {

    it("should throw error when and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = feeManager.feeAddressBeta();
      await failureAssertion(resp);
    });

    it("should return success when and axios.get returns valid data", async () => {
      const data = {
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await feeManager.feeAddressBeta();
      successAssertion(resp, data);
    });
  });
  describe("feeUtxoState function functionality test", () => {

    it("should throw error when and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = feeManager.feeUtxoState();
      await failureAssertion(resp);
    });

    it("should return success when and axios.get returns valid data", async () => {
      const data = {
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await feeManager.feeUtxoState();
      successAssertion(resp, data);
    });
  });
});
