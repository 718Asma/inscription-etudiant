const express = require("express");
const router = express.Router();
const inscriptionController = require("../controllers/inscriptionController");

router.post("/", inscriptionController.submitRequest);
router.get("/etat/:id", inscriptionController.getRequestStatus);

module.exports = router;
