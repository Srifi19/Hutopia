// Import required modules and dependencies
const LoginModel = require("../Models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loggerHelper = require("../Helpers/LoggerHelper");
const authValidator = require("../Validators/authValidator");
const { error } = require("winston");
require("dotenv").config();
const saltRounds = 10;

exports.createAccount = async (req, res) => {
  const { email, password, roles } = req.body;
  const result = authValidator.createAccount(email, password, roles);
  if (true) {
    const hashedPass = await bcrypt.hash(password, saltRounds);
    await LoginModel.createAccount(email, hashedPass)
      .then((userId) => {
        const token = jwt.sign({ userId }, process.env.jwtSecret, {
          expiresIn: "12h",
        });
        res.header("Authorization", `Bearer ${token}`);
        res.status(200).json({
          success: true,
          message: "Logging in was successful.",
          data: { token },
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ success: false, message: "Email Already Exists" });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "RegistrationMainInfos Have Been Unsuccesfull due to Validation Error"
    );
    res.status(434).json({ success: false, message: "Validation Error" });
  }
};

exports.login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  const result = authValidator.validateLogin(email, password);
  if (true) {
    // Check if the email exists and retrieve the hashed password
    await LoginModel.getPassword(email)
      .then(async (pass) => {
        // Compare the hashed password with the provided password
        await bcrypt
          .compare(password, pass)
          .then(async (match) => {
            if (match) {
              const userId = await LoginModel.loginUser(email);
              console.log("userId: ", userId);
              loggerHelper.SuccessLogger(email, `User logged in successfully`);
              const token = jwt.sign({ userId }, process.env.jwtSecret, {
                expiresIn: "12h",
              });

              res.header("Authorization", `Bearer ${token}`);
              res.status(200).json({
                success: true,
                message: "Logging in was successful.",
                data: { token },
              });
            } else {
              loggerHelper.ErrorLogger(
                email,
                "Login Unsuccesull getting password Was Unsucesfull"
              );
              res
                .status(400)
                .json({ success: false, message: "Password Doesnt Match" });
            }
          })
          .catch((error) => {
            loggerHelper.ErrorLogger(
              email,
              "Login Unsuccesull getting password Was Unsucesfull",
              error
            );
            res
              .status(400)
              .json({ success: false, message: "Password Doesnt Match" });
          });
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          email,
          "Login Unsuccesull getting password Was Unsucesfull",
          error
        );
        res
          .status(400)
          .json({ success: false, message: "Email Doesnt Exists" });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "Login Unsuccesull Validation Error Match",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
  // Log that a login attempt is being made
};
/**
 * Reset a user's password.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;

  const result = authValidator.validateResetPassword(oldPassword, newPassword);
  if (true) {
    // Hash the new password
    const newPass = await bcrypt.hash(newPassword, saltRounds);

    // Get the existing hashed password from the database
    const pass = await LoginModel.getPasswordById(userId);

    // Compare the hashed old password with the existing hashed password
    const match = await bcrypt.compare(oldPassword, pass);

    if (match) {
      // Update the password in the database with the new hashed password
      await LoginModel.updatePassword(userId, newPass)
        .then(() => {
          loggerHelper.SuccessLogger(userId, "resetPassword Was succesfull");
          res.status(200).json({
            success: true,
            message: "Password has been reset successfully.",
          });
        })
        .catch((error) => {
          loggerHelper.ErrorLogger(userId, "resetPassword Not Working", error);
          res
            .status(500)
            .json({ success: false, message: "Something Went Wrong" });
        });
    } else {
      // match = false => Password Doesnt Match
      loggerHelper.ErrorLogger(
        userId,
        "resetPassword Not Working Doesnt Match",
        "Diesbt Match"
      );
      res
        .status(401)
        .json({ success: false, message: "Password doesn't match." });
    }
  } else {
    loggerHelper.ErrorLogger(
      userId,
      "resetPassword Not Working Due To Validation Error",
      "Validation error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

/**
 * Forgot password functionality with OTP token.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const result = authValidator.validateForgotPassword(email, newPassword);
  if (true) {
    // Hash the new password

    const newPass = await bcrypt.hash(newPassword, saltRounds);
    await LoginModel.forgotPassword(email, newPass)
      .then(() => {
        loggerHelper.SuccessLogger(email, "forgotPassword workign correcrylt");
        res.status(200).json({
          success: true,
          message: "Password has been reset successfully.",
        });
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          email,
          "forgotPassword not working due to Internal Error",
          error
        );
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "forgotPassword not working due to Validation Error",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};
