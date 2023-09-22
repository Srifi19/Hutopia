const express = require('express');
const router = express.Router();
const valuesController = require('../Controllers/valuesController')


router.get("/GetSkillsByChar",valuesController.GetSkillsByChar)
router.get("/GetCertificatesByChar",valuesController.GetCertificateByChars)
router.get("/GetAllPerks" , valuesController.GetPerks);
router.get("/GetAllSuplementalPay" , valuesController.GetAllSuplementalPay);
module.exports = router;
