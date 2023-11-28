const express = require("express");
const router = express.Router();
const proficiencyController = require("../Controllers/proficiencyController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateproficiency",
  authMiddleware.authenticateToken,
  proficiencyController.updateOrAddProficiency
);
router.get(
  "/getAllproficiency",
  authMiddleware.authenticateToken,
  proficiencyController.getAllProficiency
);
router.delete(
  "/deleteproficiency",
  authMiddleware.authenticateToken,
  proficiencyController.deleteProficiency
);

module.exports = router;
