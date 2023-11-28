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

/**
 * Validate user's main information.
 *
 * @param {Object} data - User data to validate.
 * @returns {Object} - Validation result.
 */
exports.createAccount = (email, password, roles) => {
  const data = { email: email, password: password, roles: roles };
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required()
      .error(() =>
        createCustomError(
          "Email is in the wrong Format",
          validatorsCode.ErrorCode.EMAIL_ERROR
        )
      ), // 123 is the error code
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .required()
      .error(() =>
        createCustomError(
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
          validatorsCode.ErrorCode.PASSWORD_ERROR
        )
      ), // 124 is the error code
    roles: Joi.string().max(50),
  });

  return validate(schema, data);
};

exports.validateLogin = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(() =>
        createCustomError("Invalid Email", validatorsCode.ErrorCode.EMAIL_ERROR)
      ),
    password: Joi.string()
      .min(6)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Password",
          validatorsCode.ErrorCode.PASSWORD_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateResetPassword = (oldPassword, newPassword) => {
  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  const schema = Joi.object({
    oldPassword: Joi.string()
      .min(6)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Old Password",
          validatorsCode.ErrorCode.PASSWORD_ERROR
        )
      ),
    newPassword: Joi.string()
      .min(6)
      .required()
      .error(() =>
        createCustomError(
          "Invalid New Password",
          validatorsCode.ErrorCode.PASSWORD_ERROR
        )
      ),
  });

  return { data, schema };
};

exports.validateForgotPassword = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(() =>
        createCustomError("Invalid Email", validatorsCode.ErrorCode.EMAIL_ERROR)
      ),
    password: Joi.string()
      .min(6)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Password",
          validatorsCode.ErrorCode.PASSWORD_ERROR
        )
      ),
  });

  return validate(schema, data);
};

function validate(schema, data) {
  const validationResult = schema.validate(data);

  if (validationResult.error) {
    return {
      flag: false,
      message: validationResult.error.message,
      errorCode: validationResult.error.code,
    };
  } else {
    return {
      flag: true,
    };
  }
}
