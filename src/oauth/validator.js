const Joi = require('joi');
const validator = {};

validator.registerClient = async (opts) => {
  const schema = Joi.object({
    data: Joi.object({
      name: Joi.string().allow('', null),
      email: Joi.string().required(),
      shortDescription: Joi.string().required(),
      longDescription: Joi.string().allow('', null),
      successRedirectURL: Joi.string().allow('', null),
      errorRedirectURL: Joi.string().allow('', null),
      permissions: Joi.array(),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.getClientByKey = async (opts) => {
  const schema = Joi.object({
    key: Joi.string().allow('', null),
  });
  await schema.validateAsync(opts);
};

validator.updateClient = async (opts) => {
  const schema = Joi.object({
    key: Joi.string().allow('', null),
    data: Joi.object({
      name: Joi.string().allow('', null),
      email: Joi.string().required(),
      shortDescription: Joi.string().required(),
      longDescription: Joi.string().allow('', null),
      successRedirectURL: Joi.string().allow('', null),
      errorRedirectURL: Joi.string().allow('', null),
      permissions: Joi.array(),
    }).required(),
  });
  await schema.validateAsync(opts);
};

validator.generateCode = async (opts) => {
  const schema = Joi.object({
    data: Joi.object({
      clientKey: Joi.string().allow('', null),
      userID: Joi.string().allow('', null),
      access: Joi.object()({
        access_scope: Joi.string().allow('', null),
        acccess_type: Joi.string().allow('', null),
      }),
    }).required(),
  });
  await schema.validateAsync(opts);
};


validator.generateToken = async (opts) => {
  const schema = Joi.object({
    data: Joi.object({
      clientKey: Joi.string().allow('', null),
      clientSecret: Joi.string().allow('', null),
      code: Joi.string().allow('', null),
    }).required(),
  });
  await schema.validateAsync(opts);
};


module.exports = validator;
