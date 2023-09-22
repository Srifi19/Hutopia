const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const enterpriseController = require('../Controllers/enterpriseController')

router.post('/CreateEnterpriseSchedule', authMiddleware.authenticateToken, enterpriseController.CreateEnterpriseSchedule);

module.exports = router;
