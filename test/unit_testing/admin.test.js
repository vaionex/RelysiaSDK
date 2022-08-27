const sinon = require("sinon");
const { default: axios } = require("axios");
const Admin = require("../../src/admin");

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

describe("Admin functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const admin = new Admin(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("migrateToken function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"walletid" is required`;

      const resp = admin.migrateToken(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "walletid",
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.migrateToken(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "walletid",
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.migrateToken(opts);
      successAssertion(resp, data);
    });
  });
  describe("generateToken function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"userid" is required`;

      const resp = admin.generateToken(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        userid: "userid",
        data: {
          domain: "www.domain.com",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.generateToken(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        userid: "userid",
        data: {
          domain: "www.domain.com",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.generateToken(opts);
      successAssertion(resp, data);
    });
  });
  describe("verifyToken function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"userid" is required`;

      const resp = admin.verifyToken(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        userid: "userid",
        data: {
          domain: "www.domain.com",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.verifyToken(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        userid: "userid",
        data: {
          domain: "www.domain.com",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.verifyToken(opts);
      successAssertion(resp, data);
    });
  });
  describe("setup function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = null;
      const msg = `"value" must be of type object`;

      const resp = admin.setUp(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        data: {},
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.setUp(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        data: {},
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.setUp(opts);
      successAssertion(resp, data);
    });
  });
  describe("getSetupByserviceid function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"serviceid" is required`;

      const resp = admin.getSetupByserviceid(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      const opts = {
        serviceid: "serviceid",
      };
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.getSetupByserviceid(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const opts = {
        serviceid: "serviceid",
      };
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.getSetupByserviceid(opts);
      successAssertion(resp, data);
    });
  });
  describe("updateSetupByserviceid function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"serviceid" is required`;

      const resp = admin.updateSetupByserviceid(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.put returns invalid status", async () => {
      const opts = {
        serviceid: "serviceid",
        data: {},
      };
      axios.put.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.updateSetupByserviceid(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.put returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
        data,
      };
      axios.put.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.updateSetupByserviceid(opts);
      successAssertion(resp, data);
    });
  });
  describe("deleteSetupByserviceid function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"serviceid" is required`;

      const resp = admin.deleteSetupByserviceid(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.delete returns invalid status", async () => {
      const opts = {
        serviceid: "serviceid",
      };
      axios.delete.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.deleteSetupByserviceid(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.delete returns valid data", async () => {
      const data = {};
      const opts = {
        serviceid: "serviceid",
      };
      axios.delete.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.deleteSetupByserviceid(opts);
      successAssertion(resp, data);
    });
  });
  describe("getSetupByserviceids function functionality test", () => {
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = admin.getSetupByserviceids();
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await admin.getSetupByserviceids();
      successAssertion(resp, data);
    });
  });
});
