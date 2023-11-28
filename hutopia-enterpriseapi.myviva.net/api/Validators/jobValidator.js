const Joi = require("joi");
const { error } = require("winston");
const validatorsCode = require("./validatorsCode");
/**
 * Create a custom error object with an error code.
 *
 * @param {string} message - Error message.
 * @param {number} code - Error code.
 * @returns {Error} - Custom error object.
 */
function createCustomError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function validateTest(schema, data) {
  const validationResult = schema.validate(data, { abortEarly: false });

  if (validationResult.error) {
    const validationErrors = validationResult.error.details.map((error) => {
      return {
        message: error.message,
        path: error.path,
        flag: false,
      };
    });

    return {
      flag: false,
      validationErrors: validatorsCode.ErrorCode.PHONE_NUMBER_ERROR,
    };
  } else {
    return {
      flag: true,
    };
  }
}

exports.validateCreateJob = (data) => {
  const jobSchema = Joi.object({
    JobTitle: Joi.string().required(),
    WorkPlaceType: Joi.string()
      .valid("In-person", "Remote", "Hybrid")
      .required(),
    JobDescription: Joi.string().required(),
    JobDuties: Joi.array().items(Joi.string()).required(),
    JobType: Joi.string()
      .valid("Full-Time", "Part-Time", "Internship")
      .required(),
    Subject: Joi.string().required(),
    SubjectLevel: Joi.string()
      .valid("Beginner", "Intermediate", "Advanced")
      .required(),
    amountExperience: Joi.number().integer().min(0).required(),
    Skills: Joi.array().items(Joi.string()).required(),
    Perks: Joi.array().items(Joi.string()).required(),
    Comments: Joi.string().required(),
    SalaryFixed: Joi.number()
      .integer()
      .min(0)
      .when("rangeType", {
        is: 1,
        then: Joi.required(),
        otherwise: Joi.required().default(0),
      }),

    SalaryRangeFrom: Joi.number()
      .integer()
      .min(0)
      .when("rangeType", {
        is: 0,
        then: Joi.required(),
        otherwise: Joi.required().default(0),
      }),

    SalaryRangeTo: Joi.number()
      .integer()
      .min(0)
      .when("rangeType", {
        is: 0,
        then: Joi.required(),
        otherwise: Joi.required().default(0),
      }),
    SalaryType: Joi.string().valid("per month", "per year", "per week"),
    Currency: Joi.string().required(),
    SupplementalPay: Joi.array().items(Joi.string()).required(),
    rangeType: Joi.number().integer().valid(0, 1).required(),
  });
  return validateTest(jobSchema, data);
};
exports.validateCreateJobSchedule = (jobSchedule) => {
  const data = { jobSchedule: jobSchedule };
  const schema = Joi.object({
    Day: Joi.string()
      .valid(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      )
      .required(),
    FromTime: Joi.string().isoDate().required(),
    ToTime: Joi.string().isoDate().required(),
    BreakTime: Joi.string().isoDate().required(),
  });
  return validateTest(schema, data);
};
