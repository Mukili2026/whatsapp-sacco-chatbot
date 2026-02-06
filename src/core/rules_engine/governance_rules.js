/**
 * SACCO Assist – Governance Rules
 *
 * These rules protect against fraud, abuse of power,
 * and weak internal controls.
 *
 * Each rule:
 * - Evaluates a situation
 * - Returns PASS or FAILED
 * - Assigns a risk level
 * - Provides a human-readable message
 */

/**
 * Rule ID: GOV-001
 * Rule Name: Same User Creates and Approves Loan
 * Risk Level: HIGH
 */
function checkSameUserCreatesAndApprovesLoan(loan) {
  if (!loan) {
    return {
      status: "PASS"
    };
  }

  const createdBy = loan.createdBy;
  const approvedBy = loan.approvedBy;

  if (createdBy && approvedBy && createdBy === approvedBy) {
    return {
      status: "FAILED",
      risk: "HIGH",
      ruleId: "GOV-001",
      message: "The same user created and approved this loan. This violates governance rules.",
      evidence: {
        loanId: loan.id,
        createdBy,
        approvedBy,
        timestamp: new Date().toISOString()
      }
    };
  }

  return {
    status: "PASS",
    ruleId: "GOV-001"
  };
}

module.exports = {
  checkSameUserCreatesAndApprovesLoan
};
src/core/rules_engine/index.js
/**
 * SACCO Assist – Rules Engine
 *
 * This file coordinates all compliance rules.
 * Business modules (loans, PDM, savings) call this engine.
 */

const {
  checkSameUserCreatesAndApprovesLoan
} = require("./governance_rules");

const { getRiskAction } = require("../../config/risk_actions");

/**
 * Run governance-related rules for a loan
 */
function runLoanGovernanceRules(loan) {
  const results = [];

  // GOV-001: Same user creates & approves loan
  const govRuleResult = checkSameUserCreatesAndApprovesLoan(loan);

  if (govRuleResult.status === "FAILED") {
    const actionPlan = getRiskAction(govRuleResult.risk);

    results.push({
      ...govRuleResult,
      actionPlan
    });
  }

  return results;
}

module.exports = {
  runLoanGovernanceRules
};
const { runLoanGovernanceRules } = require("../core/rules_engine");

const ruleResults = runLoanGovernanceRules(loan);

if (ruleResults.length > 0) {
  // handle alerts, blocking, evidence logging
}
[
  {
    status: "FAILED",
    risk: "HIGH",
    ruleId: "GOV-001",
    message: "The same user created and approved this loan. This violates governance rules.",
    evidence: { ... },
    actionPlan: {
      level: "HIGH",
      description: "Critical issue that poses financial or governance risk",
      actions: {
        notify: true,
        requireExplanation: true,
        blockOperation: true,
        escalate: true
      }
    }
  }
]

