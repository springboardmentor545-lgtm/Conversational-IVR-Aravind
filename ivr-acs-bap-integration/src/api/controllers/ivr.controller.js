const acsService = require("../services/acs.service");
const bapService = require("../services/bap.service");
const logger = require("../../utils/logger");
const nluService = require("../services/nlu.service");

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

// Updated Conversational Handler for all 10 intents
exports.handleConversation = async (req, res) => {
  const { sessionId, query } = req.body;

  if (!sessionId || !query) {
    return res.status(400).json({ error: "Missing sessionId or query" });
  }

  // 1. Get intent from the NLU service
  const intent = nluService.getIntent(query);
  logger.info(`Recognized intent: ${intent} for session: ${sessionId}`);

  try {
    let response;
    // 2. Route based on the full list of intents
    switch (intent) {
      case "CheckBalance":
        response = await bapService.getBalanceFromSpeech(sessionId);
        break;
      case "TalkToAgent":
        response = await acsService.transferToAgentFromSpeech(sessionId);
        break;
      case "GetMiniStatement":
        response = await bapService.getMiniStatementFromSpeech(sessionId);
        break;
      case "ReportLostCard":
        response = await acsService.reportLostCardFromSpeech(sessionId);
        break;
      case "ActivateNewCard":
        response = await acsService.activateNewCardFromSpeech(sessionId);
        break;
      case "PayUtilityBill":
        response = await bapService.payUtilityBillFromSpeech(sessionId);
        break;
      case "UpdateContactDetails":
        response = await acsService.updateContactDetailsFromSpeech(sessionId);
        break;
      case "GetLoanDetails":
        response = await bapService.getLoanDetailsFromSpeech(sessionId);
        break;
      case "ReportSuspiciousTransaction":
        response = await acsService.reportSuspiciousTransactionFromSpeech(
          sessionId
        );
        break;
      case "RequestEStatement":
        response = await bapService.requestEStatementFromSpeech(sessionId);
        break;
      default: // Fallback for 'Unknown' intent
        response = {
          sessionId,
          response: "Sorry, I didn't understand that. Can you please rephrase?",
        };
    }
    res.status(200).json(response);
  } catch (error) {
    logger.error(
      `Error processing conversational request for session ${sessionId}:`,
      error
    );
    res.status(500).json({
      sessionId,
      response: "Sorry, an error occurred on our end.",
    });
  }
};
