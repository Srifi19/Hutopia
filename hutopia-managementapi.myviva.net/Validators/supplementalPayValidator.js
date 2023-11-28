const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validateSupplementalPay = (data) => {
  const schema = Joi.object({
    supplementalvalues: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          supplementalName: Joi.string().required(),
        })
      )
      .required()
      .error(() =>
        createCustomError(
          "SupplementalPay value and id  are  in the wrong Format",
          validatorsCode.ErrorCode.VALUES_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateDeletingSupplementalPay = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
