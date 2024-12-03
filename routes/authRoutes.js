const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");


router.post("/login", authController.login);
router.post("/signup", authController.register);
router.get("/logout", verifyToken, authController.logout);

module.exports = router;