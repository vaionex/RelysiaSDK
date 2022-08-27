const sinon = require("sinon");
const { default: axios } = require("axios");
const Transaction = require("../../src/transactions");
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

describe("Transaction functions test", () => {
  const auth = {
    authToken: "authToken",
  };
  const transaction = new Transaction(auth);

  beforeEach(() => {
    sinon.stub(axios, "post");
    sinon.stub(axios, "get");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("send function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.send(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              to: "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH",
              amount: 0.000005,
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.send(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              to: "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH",
              amount: 0.000005,
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.send(opts);
      successAssertion(resp, data);
    });
  });

  describe("rawTx function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.rawtx(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              to: "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH",
              amount: 0.000005,
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.rawtx(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              to: "17n2JVhrCf1oYSMkZtZNjcf1deteUEKQsH",
              amount: 0.000005,
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.rawtx(opts);
      successAssertion(resp, data);
    });
  });

  describe("drop function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.drop(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        serviceid: "string",
        secretKey: "string",
        privateKey: "string",
        data: {
          dataArray: [
            {
              to: "string",
              amount: 0.00001,
              notes: "string",
              tokenId: "string",
              sn: 0,
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.drop(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        serviceid: "string",
        secretKey: "string",
        privateKey: "string",
        data: {
          dataArray: [
            {
              to: "string",
              amount: 0.00001,
              notes: "string",
              tokenId: "string",
              sn: 0,
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.drop(opts);
      successAssertion(resp, data);
    });
  });

  describe("offer function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.offer(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              tokenId: "string",
              sn: 0,
              amount: 0,
              type: "BSV",
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.offer(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              tokenId: "string",
              sn: 0,
              amount: 0,
              type: "BSV",
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.offer(opts);
      successAssertion(resp, data);
    });
  });

  describe("swap function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.swap(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              swapHex: "string",
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.swap(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              swapHex: "string",
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.swap(opts);
      successAssertion(resp, data);
    });
  });

  describe("exchange offer function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.exchangeOffer(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              tokenId: "string",
              sn: 1,
              amount: 0,
              type: "BSV",
              payment: [
                {
                  to: "1CZRgtb2G7ykqyfBqFXf9AutRaWKY2fN4x",
                  amount: 0,
                },
              ],
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.exchangeOffer(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              tokenId: "string",
              sn: 1,
              amount: 0,
              type: "BSV",
              payment: [
                {
                  to: "1CZRgtb2G7ykqyfBqFXf9AutRaWKY2fN4x",
                  amount: 0,
                },
              ],
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.exchangeOffer(opts);
      successAssertion(resp, data);
    });
  });

  describe("exchange swap function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.exchangeSwap(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              swapId: "string",
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.exchangeSwap(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {
          dataArray: [
            {
              swapId: "string",
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.exchangeSwap(opts);
      successAssertion(resp, data);
    });
  });

  describe("inspect function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.inspect(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        data: {
          dataArray: [
            {
              swapHex: "string",
            },
          ],
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.inspect(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        data: {
          dataArray: [
            {
              swapHex: "string",
            },
          ],
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.inspect(opts);
      successAssertion(resp, data);
    });
  });

  describe("pay function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.pay(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {},
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.pay(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        walletid: "string",
        serviceid: "string",
        data: {},
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.pay(opts);
      successAssertion(resp, data);
    });
  });

  describe("invoice function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"data" is required`;

      const resp = transaction.invoice(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        host: "string",
        serviceid: "string",
        data: {
          type: "string",
          amount: 0,
          address: "string",
          description: "string",
          expirationTimeInMinuts: 0,
          memo: "string",
          merchantData: "string",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.invoice(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        host: "string",
        serviceid: "string",
        data: {
          type: "string",
          amount: 0,
          address: "string",
          description: "string",
          expirationTimeInMinuts: 0,
          memo: "string",
          merchantData: "string",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.invoice(opts);
      successAssertion(resp, data);
    });
  });


  describe("paymentRequest function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"invoiceid" is required`;

      const resp = transaction.paymentRequest(opts);
      await failureAssertion(resp, msg);
    });
    it("should throw error when options are valid and axios.get returns invalid status", async () => {
      const opts = {
        invoiceid: "invoiceid",
      };
      axios.get.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.paymentRequest(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.get returns valid data", async () => {
      const opts = {
        invoiceid: "invoiceid",
      };
      const data = {};
      axios.get.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.paymentRequest(opts);
      successAssertion(resp, data);
    });
  });


  describe("paymentRequestByPay function functionality test", () => {
    it("should throw error when options are invalid", async () => {
      const opts = {};
      const msg = `"invoiceid" is required`;

      const resp = transaction.paymentRequestPay(opts);
      await failureAssertion(resp, msg);
    });

    it("should throw error when options are valid and axios.post returns invalid status", async () => {
      const opts = {
        invoiceid: "string",
        data: {
          merchantData: "string",
          transaction: "string",
          refundTo: "string",
          memo: "string",
        },
      };
      axios.post.returns(Promise.resolve({ status: 400, data: {} }));

      const resp = transaction.paymentRequestPay(opts);
      await failureAssertion(resp);
    });

    it("should return success when options are valid and axios.post returns valid data", async () => {
      const opts = {
        invoiceid: "string",
        data: {
          merchantData: "string",
          transaction: "string",
          refundTo: "string",
          memo: "string",
        },
      };
      const data = {};
      axios.post.returns(Promise.resolve({ status: 200, data: { data } }));

      const resp = await transaction.paymentRequestPay(opts);
      successAssertion(resp, data);
    });
  });
});
