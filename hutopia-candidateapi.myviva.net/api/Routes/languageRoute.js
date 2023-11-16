const express = require('express');
const router = express.Router();
const languageController = require("../Controllers/languageController");
const authMiddleware = require('../Middleware/authMiddleware');

router.post("/addLanguage" , authMiddleware.authenticateToken,languageController.addLanguage);
router.get("/getLanguages" , authMiddleware.authenticateToken , languageController.getLanguages)
router.get("/getAllLanguages" , authMiddleware.authenticateToken , languageController.getAllLanguages)
router.get("/getAllProficiency" , authMiddleware.authenticateToken , languageController.getAllProficiency)



module.exports = router;
