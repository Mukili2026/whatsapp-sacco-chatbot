// webhook/webhook.js
const { requestLoan } = require("../flows/request_loan");
const { approveLoan } = require("../flows/approve_prompt");

// Simulate WhatsApp message payload
// WhatsApp platform sends JSON with `type` and `body`
async function handleWebhook(req, res) {
  try {
    const message = req.body; // { type: "text", body: "..." , userId: "user_123" }

    const userId = message.userId || "user_123"; // default for testing
    let reply = "⚠️ Unrecognized command.";

    // Simple command parsing
    const text = message.body.toLowerCase();

    if (text.startsWith("request loan")) {
      // Expected format: "request loan 500000 6 Business"
      const parts = text.split(" ");
      const amount = parseInt(parts[2]);
      const termMonths = parseInt(parts[3]);
      const purpose = parts.slice(4).join(" ") || "General";
      reply = await requestLoan(userId, amount, termMonths, purpose);

    } else if (text.startsWith("approve loan")) {
      // Expected format: "approve loan LN-1001"
      const parts = text.split(" ");
      const loanId = parts[2];
      reply = await approveLoan(userId, loanId);

    } else if (text.startsWith("check balance")) {
      // Optionally, you can create checkBalance flow later
      reply = "💰 Balance checking not implemented yet.";

    }

    // Respond to WhatsApp platform
    res.json({ message: reply });

  } catch (err) {
    console.error("Webhook handling error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { handleWebhook };
