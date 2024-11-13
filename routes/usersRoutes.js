const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/profile/:id", userController.getProfile);
router.put("/modifierProfile/:id", userController.updateProfile);
router.delete("/supprimerProfile/:id", userController.deleteProfile);

module.exports = router;
