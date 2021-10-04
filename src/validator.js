import Joi from 'joi';

const validator = {};

validator.auth = async (opts) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).required();
  await schema.validateAsync(opts);
};

export default validator;

