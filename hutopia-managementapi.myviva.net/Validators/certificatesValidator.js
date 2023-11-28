const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validateCertificates = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    CertificateName: Joi.string().required(),
    Provider: Joi.string().required(),
    linkofCertificate: Joi.string().uri().required(),
    Price: Joi.string().required(),
  });
  return validate(schema, data);
};
exports.validateDeletingCertificate = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
