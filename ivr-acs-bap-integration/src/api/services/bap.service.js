const axios = require("axios");
const config = require("../../config");
const logger = require("../../utils/logger");

const getBalance = async (sessionId) => {
  try {
    const response = await axios.post(config.bapApiUrl, {
      sessionId,
      intent: "GetBalance",
    });
    return response.data;
  } catch (error) {
    logger.error("Error calling BAP service:", error.message);
    throw new Error("Failed to get response from BAP");
  }
};

module.exports = {
  getBalance,
};
