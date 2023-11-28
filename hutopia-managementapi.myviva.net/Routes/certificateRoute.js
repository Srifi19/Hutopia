const express = require("express");
const router = express.Router();
const certificateController = require("../Controllers/certificateController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateCertificate",
  authMiddleware.authenticateToken,
  certificateController.updateOrAddCertificates
);
router.delete(
  "/deleteCertificate",
  authMiddleware.authenticateToken,
  certificateController.deleteCertificates
);
router.get(
  "/getAllCertificate",
  authMiddleware.authenticateToken,
  certificateController.getAllCertificates
);

module.exports = router;
