const express = require("express");
const router = express.Router();
const perkcontroller = require("../Controllers/perkController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateperk",
  authMiddleware.authenticateToken,
  perkcontroller.updateOrAddPerks
);
router.get(
  "/getAllPerks",
  authMiddleware.authenticateToken,
  perkcontroller.getAllPerks
);
router.delete(
  "/deleteperk",
  authMiddleware.authenticateToken,
  perkcontroller.deletePerk
);

module.exports = router;
