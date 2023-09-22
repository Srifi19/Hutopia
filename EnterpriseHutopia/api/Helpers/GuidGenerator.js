module.exports.generateRandomId  =  (prefix, length = 4) => {
    const randomNumber = Math.floor(Math.random() * 10 ** length);
    const randomId = `${prefix}-${String(randomNumber).padStart(length, '0')}`;
    return randomId;
  }

  module.exports.generateRandomOTP = () => {
     // Generate a random number between 1000 and 9999 (inclusive)
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    

    
    // Create an OTP object that includes the OTP value and expiration timestamp

    
    return otp;
  }