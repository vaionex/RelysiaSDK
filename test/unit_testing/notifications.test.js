const sinon = require("sinon");
const { default: axios } = require("axios");
const Notifications = require("../../src/notifications");

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
  const notifications = new Notifications(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
    sinon.stub(axios, "put");
    sinon.stub(axios, "delete");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("notificationToken function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"userid" is required`;

      const resp = notifications.notificationToken(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.put returns invalid status", async () => {
      axios.put.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        userid: "userid",
        walletid: "walletid",
        serviceid: "serviceid",
        data: {
          expoNotificationToken: "expoNotificationToken",
        },
      };

      const resp = notifications.notificationToken(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.put returns valid data", async () => {
      const data = {};
      const opts = {
        userid: "userid",
        walletid: "walletid",
        serviceid: "serviceid",
        data: {
          expoNotificationToken: "expoNotificationToken",
        },
      };
      axios.put.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await notifications.notificationToken(opts);
      successAssertion(resp, data);
    });
  });

  describe("sendNotification function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = notifications.sendNotification(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        data: {
          userAddress: "userAddress",
        },
      };

      const resp = notifications.sendNotification(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const data = {};
      const opts = {
        walletid: "walletid",
        serviceid: "serviceid",
        data: {
          userAddress: "userAddress",
        },
      };
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await notifications.sendNotification(opts);
      successAssertion(resp, data);
    });
  });
});
