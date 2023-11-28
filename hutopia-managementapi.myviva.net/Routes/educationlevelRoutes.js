const express = require("express");
const router = express.Router();
const educationLevelController = require("../Controllers/educationLevel");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateeducationLevel",
  authMiddleware.authenticateToken,
  educationLevelController.updateOrAddeducationLevel
);
router.get(
  "/getAlleducationLevel",
  authMiddleware.authenticateToken,
  educationLevelController.getAlleducationLevel
);
router.delete(
  "/deleteeducationLevel",
  authMiddleware.authenticateToken,
  educationLevelController.deleteeducationLevel
);

module.exports = router;
