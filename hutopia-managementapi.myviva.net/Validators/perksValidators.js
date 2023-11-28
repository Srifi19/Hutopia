const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validatePerks = (data) => {
  const schema = Joi.object({
    listvalues: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          perkName: Joi.string().required(),
        })
      )
      .required()

      .error(() =>
        createCustomError(
          "PerkName and id  are  in the wrong Format",
          validatorsCode.ErrorCode.VALUES_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateDeletingPerks = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
