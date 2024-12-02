const express = require("express");
const router = express.Router();
const faculteController = require("../controllers/faculteController");

router.get("/", faculteController.getAllFacultes);
router.post("/add", faculteController.addFaculte);
router.get("/:id", faculteController.getFaculte);
router.put("/update/:id", faculteController.updateFaculte);
router.delete("/delete/:id", faculteController.deleteFaculte);

module.exports = router;