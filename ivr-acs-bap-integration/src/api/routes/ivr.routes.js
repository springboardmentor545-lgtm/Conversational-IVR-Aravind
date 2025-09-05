const express = require("express");
const router = express.Router();
const ivrController = require("../controllers/ivr.controller");

router.post("/ivr/handle-input", ivrController.handleInput);

module.exports = router;
