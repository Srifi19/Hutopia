const express = require("express");
const router = express.Router();
const supplementalController = require("../Controllers/supplementalController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateSupplementalPay",
  authMiddleware.authenticateToken,
  supplementalController.updateOrAddSupplemental
);
router.get(
  "/getAllSupplementalPay",
  authMiddleware.authenticateToken,
  supplementalController.getAllSupplementalPay
);
router.delete(
  "/deleteSupplementalPay",
  authMiddleware.authenticateToken,
  supplementalController.deleteSupplemental
);

module.exports = router;
