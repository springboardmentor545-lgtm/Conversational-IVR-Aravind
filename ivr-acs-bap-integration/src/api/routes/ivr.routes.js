// const express = require("express");
// const router = express.Router();
// const ivrController = require("../controllers/ivr.controller");

// router.post("/ivr/handle-input", ivrController.handleInput);

// // Milestone 3 Endpoint for Conversational (speech) inputs
// router.post("/conversation", ivrController.handleConversation);
// module.exports = router;

const express = require("express");
const router = express.Router();
const ivrController = require("../controllers/ivr.controller");

// Milestone 2 Endpoint for DTMF (keypress) inputs
router.post("/ivr/handle-input", ivrController.handleInput);

// Milestone 3 Endpoint for Conversational (speech) inputs
// The fix is adding "/ivr" to the path below
router.post("/ivr/conversation", ivrController.handleConversation);

module.exports = router;
