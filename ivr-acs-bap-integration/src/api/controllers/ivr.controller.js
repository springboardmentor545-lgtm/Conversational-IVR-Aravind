const acsService = require("../services/acs.service");
const bapService = require("../services/bap.service");
const logger = require("../../utils/logger");

exports.handleInput = async (req, res) => {
  const { sessionId, inputType, inputValue } = req.body;

  if (!sessionId || !inputType || !inputValue) {
    logger.error("Invalid input from IVR:", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  logger.info(
    `Received input from IVR for session ${sessionId}: ${inputValue}`
  );

  try {
    let response;
    switch (inputValue) {
      case "1":
        // Forward to BAP for balance inquiry
        response = await bapService.getBalance(sessionId);
        break;
      case "2":
        // Trigger agent transfer in ACS
        response = await acsService.transferToAgent(sessionId);
        break;
      default:
        response = {
          sessionId,
          responseText: "Invalid option. Please try again.",
        };
    }
    res.status(200).json(response);
  } catch (error) {
    logger.error("Error processing IVR request:", error);
    res.status(500).json({
      sessionId,
      responseText: "Sorry, an error occurred. Please try again later.",
    });
  }
};
