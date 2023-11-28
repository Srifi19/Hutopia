const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validateEducationLevel = (data) => {
  const schema = Joi.object({
    educationvalues: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          educationLevel: Joi.string().required(),
        })
      )
      .required()
      .error(() =>
        createCustomError(
          "Education Level value and id  are  in the wrong Format",
          validatorsCode.ErrorCode.VALUES_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateDeletingEducationLevel = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
