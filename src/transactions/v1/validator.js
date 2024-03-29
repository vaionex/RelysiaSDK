const Joi = require('joi');


class Validator {
  async send(opts) {
    const schema = Joi.object({
      walletId: Joi.string(),
      serviceId: Joi.string(),
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          to: Joi.string().required(),
          amount: Joi.number().required(),
          tokenId: Joi.string(),
          sn: Joi.string(),
          notes: Joi.string(),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async rawtx(opts) {
    const schema = Joi.object({
      walletId: Joi.string(),
      serviceId: Joi.string(),
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          to: Joi.string().required(),
          amount: Joi.number().required(),
          tokenId: Joi.string(),
          sn: Joi.string(),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async drop(opts) {
    const schema = Joi.object({
      serviceId: Joi.string(),
      secretKey: Joi.string().required(),
      privateKey: Joi.string().required(),
      data: Joi.object({
        dataArray: Joi.array()
            .min(1)
            .items({
              to: Joi.string().allow('', null),
              amount: Joi.number().required(),
              notes: Joi.string(),
              tokenId: Joi.string(),
              sn: Joi.string(),
            }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async offer(opts) {
    const schema = Joi.object({
      walletId: Joi.string(),
      serviceId: Joi.string(),
      data: Joi.object({
        dataArray: Joi.array()
            .min(1)
            .items({
              type: Joi.string().required(),
              amount: Joi.number().required(),
              tokenId: Joi.string().required(),
              sn: Joi.string().required(),
            }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async swap(opts) {
    const schema = Joi.object({
      walletId: Joi.string().allow('', null),
      serviceId: Joi.string().allow('', null),
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          swapHex: Joi.string().required(),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async exchangeOffer(opts) {
    const schema = Joi.object({
      walletId: Joi.string().allow('', null),
      serviceId: Joi.string().allow('', null),
      data: Joi.object({
        dataArray: Joi.array()
            .min(1)
            .items({
              type: Joi.string().required(),
              amount: Joi.number().min(0.00000001).required(),
              tokenId: Joi.string().required(),
              sn: Joi.string().required(),
              payment: Joi.array()
                  .max(2)
                  .items({
                    amount: Joi.number(),
                    to: Joi.string().allow('', null),
                  }),
            }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async exchangeSwap(opts) {
    const schema = Joi.object({
      walletId: Joi.string(),
      serviceId: Joi.string(),
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          swapId: Joi.string().required(),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async inspect(opts) {
    const schema = Joi.object({
      data: Joi.object({
        dataArray: Joi.array().min(1).items({
          swapHex: Joi.string().required(),
        }),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async pay(opts) {
    const schema = Joi.object({
      serviceId: Joi.string(),
      walletId: Joi.string(),
      data: Joi.object().required(),
    });
    await schema.validateAsync(opts);
  };

  async invoice(opts) {
    const schema = Joi.object({
      serviceId: Joi.string(),
      data: Joi.object({
        type: Joi.string().allow('', null),
        amount: Joi.number().required(),
        address: Joi.string().required(),
        description: Joi.string().allow('', null),
        setExpirationMinutes: Joi.number(),
        memo: Joi.string().allow('', null),
        merchantData: Joi.string().allow('', null),
      }).required(),
    });
    await schema.validateAsync(opts);
  };

  async paymentRequestParameter(opts) {
    const schema = Joi.object({
      invoiceId: Joi.string().required(),
    });
    await schema.validateAsync(opts);
  };

  async paymentRequestWithData(opts) {
    const schema = Joi.object({
      invoiceId: Joi.string().required(),
      data: Joi.object({
        memo: Joi.string().allow('', null),
        refundTo: Joi.string().allow('', null),
        transaction: Joi.string().allow('', null),
        merchantData: Joi.string().allow('', null),
      }).required(),
    });
    await schema.validateAsync(opts);
  };
}

module.exports = new Validator();
