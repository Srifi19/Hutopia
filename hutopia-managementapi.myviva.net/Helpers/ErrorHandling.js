exports.createCustomError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  return error;
};
exports.validate = (schema, data) => {
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
};
