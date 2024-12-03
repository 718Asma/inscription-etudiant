const express = require("express");
const router = express.Router();
const faculteController = require("../controllers/faculteController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, faculteController.getAllFacultes);
router.post("/add", verifyToken, faculteController.addFaculte);
router.get("/:id", verifyToken, faculteController.getFaculte);
router.put("/update/:id", verifyToken, faculteController.updateFaculte);
router.delete("/delete/:id", verifyToken, faculteController.deleteFaculte);

module.exports = router;