const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");

// Participant routes
router.post("/participants", participantController.saveParticipant);

// Answer routes
router.post("/add-answer", participantController.addAnswers)

module.exports = router;
