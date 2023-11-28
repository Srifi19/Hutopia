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
exports.validateMainInfos = (email, password) => {
  const data = { email: email, password: password };
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
  });

  return validate(schema, data);
};

/**
 * Validate contact person's information.
 *
 * @param {Object} data - Contact person data to validate.
 * @returns {Object} - Validation result.
 */
exports.validateContactPersons = (firstName, lastName, type) => {
  const data = { firstName: firstName, lastName: lastName, type: type };
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() =>
        createCustomError(
          "First Name should be between 2 and 35 characters",
          validatorsCode.ErrorCode.firstName
        )
      ),
    lastName: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() =>
        createCustomError(
          "Last Name should be between 2 and 35 characters",
          validatorsCode.ErrorCode.lastName
        )
      ), // 126 is the error code
    type: Joi.string()
      .required()
      .error(() =>
        createCustomError(
          "Type should be one of the available options",
          validatorsCode.ErrorCode.FUNCTION_ERROR
        )
      ), // 127 is the error code
  });

  return validate(schema, data);
};

/**
 * Validate company information.
 *
 * @param {Object} data - Company data to validate.
 * @returns {Object} - Validation result.
 */
exports.validateCompanyInfos = (
  CompanyName,
  phoneNumber,
  Website,
  Industry,
  linkedin,
  behance,
  instagram,
  pintrest
) => {
  const data = {
    CompanyName: CompanyName,
    phoneNumber: phoneNumber,
    Website: Website,
    Industry: Industry,
    linkedin: linkedin,
    behance: behance,
    instagram: instagram,
    pintrest: pintrest,
  };
  const schema = Joi.object({
    CompanyName: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Company Name - Wrong Format",
          validatorsCode.ErrorCode.COMPANY_NAME_ERROR
        )
      ),
    phoneNumber: Joi.string()
      .pattern(/^[\d-]+$/)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Phone Number - Wrong Format",
          validatorsCode.ErrorCode.PHONE_NUMBER_ERROR
        )
      ),
    Website: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .error(() =>
        createCustomError(
          "Invalid Website",
          validatorsCode.ErrorCode.WEBSITE_ERROR
        )
      ),
    Industry: Joi.string()
      .required()
      .error(() =>
        createCustomError(
          "Invalid Industry",
          validatorsCode.ErrorCode.INDUSTRY_ERROR
        )
      ),
  });

  return validate(schema, data);
};

exports.validateAddress = (Country, City, PostalCode, StreetAddress) => {
  const data = {
    Country: Country,
    City: City,
    postalCode: PostalCode,
    StreetAddress: StreetAddress,
  };
  const schema = Joi.object({
    Country: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Country",
          validatorsCode.ErrorCode.COUNTRY_ERROR
        )
      ),
    City: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() =>
        createCustomError("Invalid City", validatorsCode.ErrorCode.CITY_ERROR)
      ),
    postalCode: Joi.string()
      .required()
      .error(() =>
        createCustomError(
          "Invalid Postal Code",
          validatorsCode.ErrorCode.POSTAL_ERROR
        )
      ),
    StreetAddress: Joi.string()
      .min(2)
      .max(100)
      .required()
      .error(() =>
        createCustomError(
          "Invalid Street Address",
          validatorsCode.ErrorCode.STREETADDRESS_ERROR
        )
      ),
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

exports.validateCreateOTPToken = (email) => {
  const data = { email: email };
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(() =>
        createCustomError("Invalid Email", validatorsCode.ErrorCode.EMAIL_ERROR)
      ),
  });
  return validate(schema, data);
  s;
};

exports.validateVerifyOTPToken = (otp, email) => {
  const data = {
    otp: otp,
    email: email,
  };
  const schema = Joi.object({
    otp: Joi.string()
      .length(6)
      .pattern(/^\d+$/)
      .required()
      .error(() => createCustomError("Invalid OTP", 109)),
    email: Joi.string()
      .email()
      .required()
      .error(() =>
        createCustomError("Invalid Email", validatorsCode.ErrorCode.EMAIL_ERROR)
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
