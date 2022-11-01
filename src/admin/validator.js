const Joi = require('joi');
const validator = {};

validator.migrateToken = async (opts) => {
  const schema = Joi.object({
    walletID: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.generateToken = async (opts) => {
  const schema = Joi.object({
    userId: Joi.string().allow('', null),
    data: Joi.object({
      domain: Joi.string().allow('', null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.verifyToken = async (opts) => {
  const schema = Joi.object({
    data: Joi.object({
      domain: Joi.string().allow('', null),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.setUp = async (opts) => {
  const schema = Joi.object({
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.getSetUpParameter = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.putSetUpParameter = async (opts) => {
  const schema = Joi.object({
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};


validator.deleteSetUpParameter = async (opts) => {
  const schema = Joi.object({
    serviceId: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};
module.exports = validator;
