const Joi = require("joi");
const validator = {};

validator.registerClient = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      data: Joi.object()
        .required()
        .keys({
          name: Joi.string().allow("", null),
          email: Joi.string().allow("", null),
          shortDescription: Joi.string().allow("", null),
          longDescription: Joi.string().allow("", null),
          successRedirectURL: Joi.string().allow("", null),
          errorRedirectURL: Joi.string().allow("", null),
          permissions: Joi.array(),
        }),
    });
  await schema.validateAsync(opts);
};

validator.getClientByKey = async (opts) => {
  const schema = Joi.object().required().keys({
    key: Joi.string().required(),
  });
  await schema.validateAsync(opts);
};

validator.updateClient = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      key: Joi.string().required(),
      data: Joi.object()
        .required()
        .keys({
          name: Joi.string().allow("", null),
          email: Joi.string().allow("", null),
          shortDescription: Joi.string().allow("", null),
          longDescription: Joi.string().allow("", null),
          successRedirectURL: Joi.string().allow("", null),
          errorRedirectURL: Joi.string().allow("", null),
          permissions: Joi.array(),
        }),
    });
  await schema.validateAsync(opts);
};

validator.generateCode = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      data: Joi.object()
        .required()
        .keys({
          clientKey: Joi.string().required(),
          userid: Joi.string().required(),
          access: Joi.object().keys({
            access_scope: Joi.string().allow(null, ""),
            acccess_type: Joi.string().allow(null, ""),
          }),
        }),
    });
  await schema.validateAsync(opts);
};

validator.generateToken = async (opts) => {
  const schema = Joi.object()
    .required()
    .keys({
      data: Joi.object()
        .required()
        .keys({
          clientKey: Joi.string().required(),
          clientSecret: Joi.string().required(),
          code: Joi.string().required(),
        }),
    });
  await schema.validateAsync(opts);
};

module.exports = validator;
