const express = require("express");
const router = express.Router();
const jobController = require("../Controllers/jobController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.get(
  "/getAllJobs",
  authMiddleware.authenticateToken,
  jobController.getAllJobs
);

module.exports = router;
