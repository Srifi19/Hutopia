const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const enterpriseController = require('../Controllers/enterpriseController')

router.post('/CreateEnterpriseSchedule', authMiddleware.authenticateToken, enterpriseController.CreateEnterpriseSchedule);
router.get('/getEnterpriseInfos' , authMiddleware.authenticateToken , enterpriseController.getEnterpriseInfos);
module.exports = router;
