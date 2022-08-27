const sinon = require("sinon");
const { default: axios } = require("axios");
const Utility = require("../../src/utility");
const { util } = require("chai");

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

describe("Utility functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const utility = new Utility(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("uri function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"uri" is required`;

      const resp = utility.uri(opts);
      await failureAssertion(resp, msg);
    });
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      const opts = {
        uri: "uri",
      };
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = utility.uri(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const opts = {
        uri: "uri",
      };
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await utility.uri(opts);
      successAssertion(resp, data);
    });
  });

  describe("currency conversion function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"satoshis" is required`;

      const resp = utility.currencyConversion(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      const opts = {
        satoshis: "satoshis",
        currency: "currency",
      };
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = utility.currencyConversion(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const opts = {
        satoshis: "satoshis",
        currency: "currency",
      };
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await utility.currencyConversion(opts);
      successAssertion(resp, data);
    });
  });

  describe("transpile function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = utility.transpile(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        force: "force",
        data: {
          sourceCode: "string",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = utility.transpile(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        force: true,
        data: {
          sourceCode: "string",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await utility.transpile(opts);
      successAssertion(resp, data);
    });
  });

  describe("compile function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = utility.compile(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        data: {
          sourceCode: "string",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = utility.compile(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        data: {
          sourceCode: "string",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await utility.compile(opts);
      successAssertion(resp, data);
    });
  });

  describe("post function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"walletid" is required`;

      const resp = utility.post(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              notes: ["note-1", "note-2"],
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = utility.post(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              notes: ["note-1", "note-2"],
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await utility.post(opts);
      successAssertion(resp, data);
    });
  });

  describe("upload function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"walletid" is required`;

      const resp = utility.upload(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          fileUrl: "string",
          fileName: "string",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = utility.upload(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          fileUrl: "string",
          fileName: "string",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await utility.upload(opts);
      successAssertion(resp, data);
    });
  });
});
