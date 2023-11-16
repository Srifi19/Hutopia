const express = require('express');
const router = express.Router();
const prospectController = require('../Controllers/prospectController');


router.get("/getAllProspects" , prospectController.getAllProspects)

module.exports = router;
