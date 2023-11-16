const Joi = require('joi');
const { error } = require('winston');
const validatorsCode = require('./validatorsCode');


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
exports.validateMainInfos = (email , password) => {
  const data = {email:email , password:password}
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required()
      .error(() => createCustomError("Email is in the wrong Format", validatorsCode.ErrorCode.EMAIL_ERROR)), // 123 is the error code
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .required()
      .error(() => createCustomError("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character", validatorsCode.ErrorCode.PASSWORD_ERROR)), // 124 is the error code
  });

  return validate(schema, data);
}

/**
 * Validate contact person's information.
 *
 * @param {Object} data - Contact person data to validate.
 * @returns {Object} - Validation result.
 */
exports.validateContactPersons = (firstName , lastName , type) => {
  const data = {firstName:firstName , lastName:lastName,type:type};
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() => createCustomError("First Name should be between 2 and 35 characters", validatorsCode.firstName)), 
    lastName: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() => createCustomError("Last Name should be between 2 and 35 characters", 126)), // 126 is the error code
    type: Joi.string()
      .required()
      .error(() => createCustomError("Type should be one of the available options", 127)), // 127 is the error code
  });

  return validate(schema, data);
}

/**
 * Validate company information.
 *
 * @param {Object} data - Company data to validate.
 * @returns {Object} - Validation result.
 */
exports.validateCompanyInfos = (CompanyName, phoneNumber, Website, Industry, linkedin, behance, instagram, pintrest) => {
  const data = {
    CompanyName: CompanyName,
    phoneNumber: phoneNumber,
    Website: Website,
    Industry: Industry,
    linkedin: linkedin,
    behance: behance,
    instagram: instagram,
    pintrest: pintrest
  };
  const schema = Joi.object({
    CompanyName: Joi.string()
      .min(2)
      .max(35)
      .required()
      .error(() => createCustomError("Invalid Company Name - Wrong Format", 128)), // 128 is the error code
    phoneNumber: Joi.string()
      .pattern(/^[\d-]+$/)
      .required()
      .error(() => createCustomError("Invalid Phone Number - Wrong Format", 129)), // 129 is the error code
    Website: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .error(() => createCustomError("Invalid Website", 130)), // 130 is the error code
    Industry: Joi.string()
      .required()
      .error(() => createCustomError("Invalid Industry", 131)), // 131 is the error code
  });

  return validate(schema, data);
}

// Add other validation functions here...


exports.validateAddress = (Country , City, PostalCode , StreetAddress) => {
  const data = {
    Country: Country,
    City: City,
    postalCode: PostalCode,
    StreetAddress: StreetAddress
  }
return {flag:true};
}

exports.validateLogin = (email , password) => {
  const data = {
    email: email,
    password: password,
  }
    return {flag:true};
}

exports.validateResetPassword = (oldPassword,newPassword) => {
  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword
  }
    return {flag:true};
}

exports.validateForgotPassword = (email , password) => {
  const data = {
    email: email,
    password: password
  }
    return {flag:true};
}

exports.validateCreateOTPToken = (email) => {
    const data = {email:email}
    return {flag:true};
}

exports.validateVerifyOTPToken = (otp , email) => {
  const data = {
    otp: otp,
    email: email
  }
    return {flag:true};
}

// Add other validation functions here...

function validate(schema, data) {
    const validationResult = schema.validate(data);

    if (validationResult.error) {
        return {
            flag: false,
            message: validationResult.error.message,
            errorCode: validationResult.error.code
        }
    } else {
        return {
            flag: true
        }
    }
}
