const express = require('express');
const router = express.Router();
const skillController = require("../Controllers/skillController");
const authMiddleware = require('../Middleware/authMiddleware');

router.post("/addSkills" , authMiddleware.authenticateToken,skillController.addSkills);
router.get("/GetSkills" , authMiddleware.authenticateToken , skillController.getSkills)
router.get("/getAllSkills" , authMiddleware.authenticateToken , skillController.getAllSkills);
module.exports = router;
