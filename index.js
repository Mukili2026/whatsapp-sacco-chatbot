
// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { handleWebhook } = require("./webhook/webhook");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// WhatsApp webhook endpoint
app.post("/webhook", handleWebhook);

// Health check endpoint
app.get("/health", (req, res) => res.send("WhatsApp SACCO Bot is running ✅"));

app.listen(PORT, () => {
  console.log(`WhatsApp SACCO Bot running on port ${PORT}`);
});

