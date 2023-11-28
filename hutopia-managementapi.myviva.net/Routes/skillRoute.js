const express = require("express");
const router = express.Router();
const skillcontroller = require("../Controllers/skillController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateskill",
  authMiddleware.authenticateToken,
  skillcontroller.updateOrAddSkills
);
router.get(
  "/getAllSkills",
  authMiddleware.authenticateToken,
  skillcontroller.getAllSkills
);
router.delete(
  "/deleteskill",
  authMiddleware.authenticateToken,
  skillcontroller.deleteSkill
);

module.exports = router;
