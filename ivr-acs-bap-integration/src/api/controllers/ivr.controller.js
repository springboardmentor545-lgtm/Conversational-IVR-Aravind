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
        response = await bapService.getBalance(sessionId);
        break;
      case "2":
        response = await acsService.transferToAgent(sessionId);
        break;
      case "3":
        response = await bapService.getMiniStatement(sessionId);
        break;
      case "4":
        response = await acsService.reportLostCard(sessionId);
        break;
      case "5":
        response = await acsService.activateNewCard(sessionId);
        break;
      case "6":
        response = await bapService.payUtilityBill(sessionId);
        break;
      case "7":
        response = await acsService.updateContactDetails(sessionId);
        break;
      case "8":
        response = await bapService.getLoanDetails(sessionId);
        break;
      case "9":
        response = await acsService.reportSuspiciousTransaction(sessionId);
        break;
      case "10":
        response = await bapService.requestEStatement(sessionId);
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
