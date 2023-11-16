const express = require('express');
const router = express.Router();
const experienceController = require("../Controllers/experienceController");
const authMiddleware = require('../Middleware/authMiddleware');

router.post("/addExperience" , authMiddleware.authenticateToken,experienceController.addExperience);

router.get("/getExperience" , authMiddleware.authenticateToken , experienceController.getExperience);

module.exports = router;
