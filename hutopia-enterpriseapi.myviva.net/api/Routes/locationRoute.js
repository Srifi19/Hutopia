const express = require('express');
const router = express.Router();
const locationController = require("../Controllers/locationController");
const authMiddleware = require('../Middlewares/authMiddleware');


router.post("/createLocation" , authMiddleware.authenticateToken , locationController.createLocation);
router.post("/updateLocation" , authMiddleware.authenticateToken , locationController.updateLocation);
router.get("/getAllLocations" , authMiddleware.authenticateToken , locationController.getAllLocations);
router.get("/getLocation" , authMiddleware.authenticateToken , locationController.getLocation);

module.exports = router;
