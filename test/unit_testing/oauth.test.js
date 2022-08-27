const sinon = require("sinon");
const { default: axios } = require("axios");
const OAuth = require("../../src/oauth");

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

describe("Notifications functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const oauth = new OAuth(auth);

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

  describe("registerClient function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = oauth.registerClient(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        data: {
          email: "email",
          shortDescription: "shortDescription",
        },
      };

      const resp = oauth.registerClient(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        data: {
          email: "email",
          shortDescription: "shortDescription",
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await oauth.registerClient(opts);
      successAssertion(resp, data);
    });
  });

  describe("getClientByKey function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"key" is required`;

      const resp = oauth.getClientByKey(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        key: "key",
      };

      const resp = oauth.getClientByKey(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const data = {};
      const opts = {
        key: "key",
      };
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await oauth.getClientByKey(opts);
      successAssertion(resp, data);
    });
  });

  describe("updateClient function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"key" is required`;

      const resp = oauth.updateClient(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.patch returns invalid status", async () => {
      axios.patch.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        key: "key",
        data: {},
      };

      const resp = oauth.updateClient(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.patch returns valid data", async () => {
      const data = {};
      const opts = {
        key: "key",
        data,
      };
      axios.patch.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await oauth.updateClient(opts);
      successAssertion(resp, data);
    });
  });

  describe("generateCode function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = oauth.generateCode(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        data: {
          clientKey: "clientKey",
          userid: "userid",
          access: {},
        },
      };

      const resp = oauth.generateCode(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        data: {
          clientKey: "clientKey",
          userid: "userid",
          access: {},
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await oauth.generateCode(opts);
      successAssertion(resp, data);
    });
  });

  describe("generateToken function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = oauth.generateToken(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        data: {
          clientKey: "clientKey",
          clientSecret: "clientSecret",
          code: "code",
        },
      };

      const resp = oauth.generateToken(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        data: {
          clientKey: "clientKey",
          clientSecret: "clientSecret",
          code: "code",
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await oauth.generateToken(opts);
      successAssertion(resp, data);
    });
  });

  describe("getClient function functionality test", () => {
    it("should throw error when axios.get returns invalid status", async () => {
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = oauth.getClient();
      await failureAssertion(resp);
    });

    it("should return success when axios.get returns valid data", async () => {
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await oauth.getClient();
      successAssertion(resp, data);
    });
  });
});
