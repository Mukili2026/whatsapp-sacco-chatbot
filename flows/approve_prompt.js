// flows/approve_prompt.js
const { callSaccoAssistAPI } = require("../services/saccoAssistApi");

async function approveLoan(userId, loanId) {
  const response = await callSaccoAssistAPI("/loans/approve", {
    loanId,
    approvedBy: userId
  });

  if (response.blocked) {
    return `❌ Loan approval blocked: ${response.reason.message}`;
  }

  if (response.success) {
    return `✅ Loan approved successfully. Loan ID: ${response.data.loanId}`;
  }

  return `⚠️ Could not approve loan: ${response.error || "Unknown error"}`;
}

module.exports = { approveLoan };
