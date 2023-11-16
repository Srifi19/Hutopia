const express = require('express');
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require('../Middleware/authMiddleware');



router.post('/registerMainInfos' ,  authController.registerMainInfos);
router.post('/registerPersonalInfos' , authMiddleware.authenticateToken , authController.registerPersonalInfos);
router.post('/registerProfessionalInfos' , authMiddleware.authenticateToken , authController.registerProfessionalInfos);

module.exports = router;
