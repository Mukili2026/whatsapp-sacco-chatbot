// flows/request_loan.js
const { callSaccoAssistAPI } = require("../services/saccoAssistApi");

async function requestLoan(userId, amount, termMonths, purpose) {
  const response = await callSaccoAssistAPI("/loans/request", {
    userId,
    amount,
    termMonths,
    purpose,
    createdBy: userId
  });

  if (response.blocked) {
    return `❌ Loan request blocked: ${response.reason.message}`;
  }

  if (response.success) {
    return `✅ Loan request submitted successfully. Loan ID: ${response.data.loanId}`;
  }

  return `⚠️ Could not process loan request: ${response.error || "Unknown error"}`;
}

module.exports = { requestLoan };
