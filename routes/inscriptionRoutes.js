const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

router.get("/", inscriptionController.getAllInscriptions);
router.post("/submit", inscriptionController.submitRequest);
router.get("/:id", inscriptionController.getInscription);
router.put("/valider/:id", inscriptionController.validateRequest);
router.put("/rejeter/:id", inscriptionController.rejectRequest);

module.exports = router;
