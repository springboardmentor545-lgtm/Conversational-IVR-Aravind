const logger = require("../../utils/logger");

const transferToAgent = async (sessionId) => {
  // In a real implementation, you would make an API call to ACS here.
  // For now, we are just simulating the event.
  logger.info(`Simulating ACS agent transfer for session: ${sessionId}`);

  // Here you might call the ACS API to add a new participant (the agent)
  // to the call or transfer the call entirely.

  return {
    sessionId,
    responseText: "Please wait while I transfer you to an agent.",
  };
};

module.exports = {
  transferToAgent,
};
