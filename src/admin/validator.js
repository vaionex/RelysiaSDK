const Joi = require("joi");
const validator = {};

validator.migrateToken = async (opts) => {
  const schema = Joi.object().required().keys({
    walletid: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.generateToken = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      userid: Joi.string().required(),
      data: Joi.object()
        .required()
        .keys({
          domain: Joi.string().required(),
        })
        .required(),
    });
  await schema.validateAsync(opts);
};

validator.verifyToken = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      userid: Joi.string().required(),
      data: Joi.object()
        .required()
        .keys({
          domain: Joi.string().required(),
        })
        .required(),
    });
  await schema.validateAsync(opts);
};

validator.setUp = async (opts) => {
  const schema = Joi.object().required().keys({
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.getSetupByserviceid = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.updateSetupByserviceid = async (opts) => {
  const schema = Joi.object().required().keys({
    serviceid: Joi.string().required(),
    data: Joi.object().required(),
  });
  await schema.validateAsync(opts);
};

validator.deleteSetupByserviceid = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      serviceid: Joi.string().required(),
    });
  await schema.validateAsync(opts);
};
module.exports = validator;
