// server.js
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const logger = require("./src/utils/logger");
const ivrRoutes = require("./src/api/routes/ivr.routes");
const config = require("./src/config");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// API Routes
app.use("/api", ivrRoutes);

// Mock BAP Bot Endpoint (for demonstration)
app.post("/api/mock-bap-bot", (req, res) => {
  logger.info("Mock BAP Bot received request:", req.body);
  res.json({
    sessionId: req.body.sessionId,
    responseText: "Your account balance is $500",
  });
});

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
