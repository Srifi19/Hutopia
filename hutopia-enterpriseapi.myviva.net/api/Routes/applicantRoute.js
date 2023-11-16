const express = require('express');
const router = express.Router();
const applicantController = require("../Controllers/applicantController");
const authMiddleware = require('../Middlewares/authMiddleware');



router.get('/GetAllApplicants' , authMiddleware.authenticateToken , applicantController.GetAllApplicants);

module.exports = router;
