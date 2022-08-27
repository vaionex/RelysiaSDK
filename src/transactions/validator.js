const Joi = require("joi");
const validator = {};

validator.send = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array().min(1).items({
        to: Joi.string().required(),
        amount: Joi.number().required(),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.rawtx = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array().min(1).items({
        to: Joi.string().required(),
        amount: Joi.number().required(),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.drop = async (opts) => {
  const schema = Joi.object({
    serviceid: Joi.string().allow("", null),
    secretKey: Joi.string().allow("", null),
    privateKey: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array()
        .min(1)
        .items({
          to: Joi.string().allow("", null),
          amount: Joi.number().required(),
          notes: Joi.string().allow("", null),
          tokenId: Joi.string().allow("", null),
          sn: Joi.string().allow("", null),
        }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.offer = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array()
        .min(1)
        .items({
          type: Joi.string().allow("", null),
          amount: Joi.number().min(0.00000001).required(),
          tokenId: Joi.string().allow("", null),
          sn: Joi.string().allow("", null),
        }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.swap = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array().min(1).items({
        swapHex: Joi.string().required(),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.exchangeOffer = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array()
        .min(1)
        .items({
          type: Joi.string().allow("", null),
          amount: Joi.number().min(0.00000001).required(),
          tokenId: Joi.string().allow("", null),
          sn: Joi.string().allow("", null),
          payment: Joi.array()
            .max(2)
            .items({
              amount: Joi.number(),
              to: Joi.string().allow("", null),
            }),
        }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.exchangeSwap = async (opts) => {
  const schema = Joi.object({
    walletid: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      dataArray: Joi.array().min(1).items({
        swapId: Joi.string().required(),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.inspect = async (opts) => {
  const schema = Joi.object({
    data: Joi.object({
      dataArray: Joi.array().min(1).items({
        swapHex: Joi.string().required(),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.pay = async (opts) => {
  const schema = Joi.object({
    serviceid: Joi.string().allow("", null),
    walletid: Joi.string().allow("", null),
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.invoice = async (opts) => {
  const schema = Joi.object({
    host: Joi.string().allow("", null),
    serviceid: Joi.string().allow("", null),
    data: Joi.object({
      type: Joi.string().allow("", null),
      amount: Joi.number().required(),
      address: Joi.string().required(),
      description: Joi.string().allow("", null),
      setExpirationMinutes: Joi.number(),
      memo: Joi.string().allow("", null),
      merchantData: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.paymentRequestParameter = async (opts) => {
  const schema = Joi.object({
    invoiceId: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.paymentRequestWithData = async (opts) => {
  const schema = Joi.object({
    invoiceId: Joi.string().required(),
    data: Joi.object({
      memo: Joi.string().allow("", null),
      refundTo: Joi.string().allow("", null),
      transaction: Joi.string().allow("", null),
      merchantData: Joi.string().allow("", null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

module.exports = validator;
