const { runLoanGovernanceRules } = require("../../core/rules_engine");
async function approveLoan(loanId, approverId) {
  // fetch loan
  // mark approved
  // save
}
async function approveLoan(loanId, approverId) {
  const loan = await getLoanById(loanId);

  // attach approver temporarily for rule evaluation
  loan.approvedBy = approverId;

  // 🔍 RUN GOVERNANCE RULES
  const ruleResults = runLoanGovernanceRules(loan);

  // 🚫 BLOCK IF ANY RULE DEMANDS IT
  const blockingIssue = ruleResults.find(
    r => r.actionPlan?.actions?.blockOperation === true
  );

  if (blockingIssue) {
    // OPTIONAL (but recommended): log this later
    throw new Error(
      `Loan approval blocked: ${blockingIssue.message}`
    );
  }

  // ✅ SAFE TO APPROVE
  loan.status = "APPROVED";
  loan.approvedAt = new Date();
  await saveLoan(loan);

  return loan;
}
throw {
  code: "LOAN_BLOCKED_BY_GOVERNANCE",
  ruleId: blockingIssue.ruleId,
  message: blockingIssue.message
};
