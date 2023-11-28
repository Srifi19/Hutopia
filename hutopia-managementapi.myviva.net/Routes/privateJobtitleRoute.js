const express = require("express");
const router = express.Router();
const privatecontroller = require("../Controllers/privatejobtitleController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post(
  "/upcreateprivatejob",
  authMiddleware.authenticateToken,
  privatecontroller.updateOrAddPrivateJobTitle
);
router.get(
  "/getAllprivatejob",
  authMiddleware.authenticateToken,
  privatecontroller.getAllPrivateJobTitle
);
router.delete(
  "/deleteprivatejob",
  authMiddleware.authenticateToken,
  privatecontroller.deletePrivateJobTitle
);

module.exports = router;
