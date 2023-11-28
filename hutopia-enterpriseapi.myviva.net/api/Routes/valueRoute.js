const express = require("express");
const router = express.Router();
const valuesController = require("../Controllers/valuesController");

router.get("/GetSkills", valuesController.getSkills);
router.get("/GetCertificatesByChar", valuesController.getCertificatesByChars);
router.get("/GetAllPerks", valuesController.getAllPerks);
router.get("/GetAllSuplementalPay", valuesController.getAllSupplementalPay);

module.exports = router;

//api/values/getSkills
