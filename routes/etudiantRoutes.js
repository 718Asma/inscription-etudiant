const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/etudiantController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/profiles", verifyToken, etudiantController.getAllProfiles);
router.get("/profile/:id", verifyToken, etudiantController.getProfile);
router.put("/modifierProfile/:id", verifyToken, etudiantController.updateProfile);
router.delete("/supprimerProfile/:id", verifyToken, etudiantController.deleteProfile);

module.exports = router;