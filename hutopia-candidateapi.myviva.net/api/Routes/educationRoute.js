const express = require('express');
const router = express.Router();
const educationController = require("../Controllers/educationController");
const authMiddleware = require('../Middleware/authMiddleware');

router.post("/addEducation" , authMiddleware.authenticateToken,educationController.addEducation);
router.get("/getEducation" , authMiddleware.authenticateToken , educationController.getEducation);


module.exports = router;
