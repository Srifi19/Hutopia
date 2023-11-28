const express = require("express");
const router = express.Router();
const candidateController = require("../Controllers/candidateController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.get(
  "/getAllCandidate",
  authMiddleware.authenticateToken,
  candidateController.getAllCandidate
);

module.exports = router;
