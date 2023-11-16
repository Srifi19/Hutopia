const express = require('express');
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require('../Middlewares/authMiddleware');

// Register a new user's address
router.post('/registerAddress', authMiddleware.authenticateToken, authController.registerAddress);

// Register a new contact person associated with the user
router.post('/registerContactPerson', authMiddleware.authenticateToken, authController.registerContactPerson);

// Register a user with main information
router.post('/registerMainInfos', authController.registerMainInfos);

// Register company information associated with the user
router.post('/registerCompanyInfos', authMiddleware.authenticateToken, authController.registerCompanyInfos);

// Reset a user's password
router.post('/resetPassword', authMiddleware.authenticateToken, authController.resetPassword);

// Forgot password functionality with OTP token
router.post('/forgotPassword', authController.forgotPassword);

// Create an OTP token for email verification
router.post('/createOTPToken', authController.createOTPToken);

// Refresh a user's access token using a refresh token
router.post('/refreshToken', authMiddleware.refreshToken);

// Log in a user
router.post('/login', authController.login);

// Verify a Token
router.post('/verifyPin', authController.verifyOTPToken);


module.exports = router;
