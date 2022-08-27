const sinon = require("sinon");
const { default: axios } = require("axios");
const Delete = require("../../src/delete");

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

describe("Delete functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const del = new Delete(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("deleteUserAccount function functionality test", () => {
    it("should throw error when axios.delete returns invalid status", async () => {
      axios.delete.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = del.deleteUserAccount();
      await failureAssertion(resp);
    });

    it("should return success when axios.delete returns valid data", async () => {
      const data = {};
      axios.delete.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await del.deleteUserAccount();
      successAssertion(resp, data);
    });
  });

  describe("deleteAllWallets function functionality test", () => {
    it("should throw error when axios.delete returns invalid status", async () => {
      axios.delete.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = del.deleteAllWallets();
      await failureAssertion(resp);
    });

    it("should return success when axios.delete returns valid data", async () => {
      const data = {};
      axios.delete.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await del.deleteAllWallets();
      successAssertion(resp, data);
    });
  });

  describe("notificationToken function functionality test", () => {
    it("should throw error when options are invalid ", async () => {
      const opt = {};
      const msg = `"userid" is required`;

      const resp = del.notificationToken(opt);
      await failureAssertion(resp, msg);
    });
    it("should throw error when options are valid and axios.delete returns invalid status", async () => {
      const opt = {
        userid: "userid",
      };
      axios.delete.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = del.notificationToken(opt);
      await failureAssertion(resp);
    });

    it("should return success when axios.delete returns valid data", async () => {
      const data = {};
      const opt = {
        userid: "userid",
      };
      axios.delete.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await del.notificationToken(opt);
      successAssertion(resp, data);
    });
  });
});
