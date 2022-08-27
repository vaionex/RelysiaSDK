const sinon = require("sinon");
const { default: axios } = require("axios");
const Auth = require("../../src/auth");

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

describe("Auth functions test", () => {
  const config = {
    email: "one@vaionex.com",
    password: "password",
  };
  const auth = new Auth(config);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("auth function functionality test", () => {
    it("should throw error when axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = auth.auth();
      await failureAssertion(resp);
    });

    it("should return success when axios.post returns valid data", async () => {
      const data = {
        token: "token",
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await auth.auth();
      successAssertion(resp, data);
    });
  });

  describe("signup function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"email" is required`;

      const resp = auth.signUp(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = auth.signUp(config);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {
        token: "token",
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await auth.signUp(config);
      successAssertion(resp, data);
    });
  });

  describe("resetPassword function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"email" is required`;

      const resp = auth.resetPassword(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        email: "one@vaionex.com",
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = auth.resetPassword(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        email: "one@vaionex.com",
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await auth.resetPassword(opts);
      successAssertion(resp, data);
    });
  });

  describe("sendOtp function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"from" is required`;

      const resp = auth.sendOtp(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        from: "one@vaionex.com",
        to: "one@vaionex.com",
        message: "message",
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = auth.sendOtp(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        from: "one@vaionex.com",
        to: "one@vaionex.com",
        message: "message",
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await auth.sendOtp(opts);
      successAssertion(resp, data);
    });
  });

  describe("validateOtp function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"to" is required`;

      const resp = auth.validateOtp(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        to: "one@vaionex.com",
        otp: "otp",
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = auth.validateOtp(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        to: "one@vaionex.com",
        otp: "otp",
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await auth.validateOtp(opts);
      successAssertion(resp, data);
    });
  });
});
