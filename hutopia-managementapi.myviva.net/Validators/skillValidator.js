const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
const { validate, createCustomError } = require("../Helpers/ErrorHandling");

exports.validateSkills = (data) => {
  const schema = Joi.object({
    skillvalues: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          skillName: Joi.string().required(),
        })
      )
      .required()

      .error(() =>
        createCustomError(
          "SkillName and id  are  in the wrong Format",
          validatorsCode.ErrorCode.VALUES_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateDeletingSkills = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return validate(schema, data);
};
