const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validateProficiency = (data) => {
  const schema = Joi.object({
    proficiencyvalues: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          proficiencyLevel: Joi.string().required(),
        })
      )

      .required()
      .error(
        (err) => console.log(err),
        createCustomError(
          "Proficiency value and id  are  in the wrong Format",
          validatorsCode.ErrorCode.VALUES_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateDeletingProficiency = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
