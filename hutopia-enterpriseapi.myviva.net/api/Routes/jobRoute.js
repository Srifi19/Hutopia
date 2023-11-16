const express = require('express');
const router = express.Router();
const jobController = require("../Controllers/jobController");
const authMiddleware = require('../Middlewares/authMiddleware');


router.post('/CreateJob' , authMiddleware.authenticateToken, jobController.CreateJob)
router.get('/GetAllJobsForEnterprise' , authMiddleware.authenticateToken , jobController.GetAllJobsForEnterprise);
router.get('/GetJobInformations' , authMiddleware.authenticateToken , jobController.GetJobInformations);
router.get('/GetJobDetailedInformations' , authMiddleware.authenticateToken , jobController.GetJobDetailedInformations);
router.post('/CreateJobSchedule', authMiddleware.authenticateToken, jobController.CreateJobSchedule);

module.exports = router;
