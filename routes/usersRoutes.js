const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/profiles", verifyToken, userController.getAllProfiles);
router.get("/profile/:id", verifyToken, userController.getProfile);
router.put("/modifierProfile/:id", verifyToken, userController.updateProfile);
router.delete("/supprimerProfile/:id", verifyToken, userController.deleteProfile);

module.exports = router;