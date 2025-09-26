const express = require("express");
const router = express.Router();
const ivrController = require("../controllers/ivr.controller");

// Endpoint for DTMF (keypress) inputs
router.post("/ivr/handle-input", ivrController.handleInput);

// Endpoint for Conversational (speech) inputs

router.post("/ivr/conversation", ivrController.handleConversation);

module.exports = router;
