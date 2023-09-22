const express = require('express');
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require('../Middlewares/authMiddleware');




// Register a new user
router.post('/registerAddress',authMiddleware.authenticateToken,authController.registerAddress);
router.post('/registerContactPerson', authMiddleware.authenticateToken, authController.registerContactPerson);
router.post('/registerMainInfos',authController.registerMainInfos);
router.post('/registerCompanyInfos', authMiddleware.authenticateToken, authController.registerCompanyInfos);
router.post('/resetPassword', authMiddleware.authenticateToken,authController.resetPassword);
router.post('/forgotPassword' , authMiddleware.authenticateToken ,authController.forgotPassword);
router.post('/createOTPToken' , authController.createOTPToken);
router.post('/RefreshToken' ,authMiddleware.refreshToken);

// Log in a user
router.get('/login', authController.login);



module.exports = router;

