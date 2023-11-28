const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validatePrivateJobTitle = (data) => {
  const schema = Joi.object({
    jobprivatevalues: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          PrivateJobName: Joi.string().required(),
        })
      )

      .required()
      .error(() =>
        createCustomError(
          "Private Job Title value and id  are  in the wrong Format",
          validatorsCode.ErrorCode.VALUES_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateDeletingPrivateJobtitle = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
