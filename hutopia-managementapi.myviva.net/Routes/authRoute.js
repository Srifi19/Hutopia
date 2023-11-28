const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");
// Create Account
router.post(
  "/createaccount",

  authController.createAccount
);
// Log in a user
router.post("/login", authController.login);

// Forgot password functionality with OTP token
router.post("/forgotPassword", authController.forgotPassword);

// Reset a user's password
router.post(
  "/resetPassword",
  authMiddleware.authenticateToken,
  authController.resetPassword
);

module.exports = router;
