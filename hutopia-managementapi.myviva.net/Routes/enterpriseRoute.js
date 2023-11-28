const express = require("express");
const router = express.Router();
const enterpriseController = require("../Controllers/enterpriseController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.get(
  "/getAllEnterprise",
  authMiddleware.authenticateToken,
  enterpriseController.getAllEnterprise
);

router.get(
  "/getNbofAppllicantandProspect",
  authMiddleware.authenticateToken,
  enterpriseController.getNumofApplicantAndPorspect
);
router.put(
  "/updatesuspend",
  authMiddleware.authenticateToken,
  enterpriseController.updateSuspend
);
router.put(
  "/updateunsuspend",
  authMiddleware.authenticateToken,
  enterpriseController.updateUnSuspend
);

module.exports = router;
