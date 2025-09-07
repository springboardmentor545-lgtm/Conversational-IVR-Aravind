const logger = require("../../utils/logger");

const transferToAgent = async (sessionId) => {
  logger.info(`Simulating ACS agent transfer for session: ${sessionId}`);
  return {
    sessionId,
    responseText: "Please wait while I transfer you to an agent.",
  };
};

const reportLostCard = async (sessionId) => {
  logger.info(`Simulating lost card report for session: ${sessionId}`);
  return {
    sessionId,
    responseText:
      "Thank you. Your card has been blocked immediately. A customer service agent will call you shortly to confirm.",
  };
};

const activateNewCard = async (sessionId) => {
  logger.info(`Simulating new card activation for session: ${sessionId}`);
  return {
    sessionId,
    responseText:
      "To activate your new card, please enter the 16-digit card number followed by the hash key.",
  };
};

const updateContactDetails = async (sessionId) => {
  logger.info(`Simulating contact detail update for session: ${sessionId}`);
  return {
    sessionId,
    responseText:
      "A secure link to update your contact details has been sent to your registered mobile number. Please follow the instructions in the message.",
  };
};

const reportSuspiciousTransaction = async (sessionId) => {
  logger.info(
    `Simulating suspicious transaction report for session: ${sessionId}`
  );
  return {
    sessionId,
    responseText:
      "Thank you for reporting this. A temporary hold has been placed on your account for security. Our fraud protection team will contact you within the next hour.",
  };
};

module.exports = {
  transferToAgent,
  reportLostCard,
  activateNewCard,
  updateContactDetails,
  reportSuspiciousTransaction,
};
