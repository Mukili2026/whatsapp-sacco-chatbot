/**
 * SACCO Assist – Risk Action Configuration
 *
 * This file defines what the system should do
 * when a compliance rule is violated.
 *
 * IMPORTANT:
 * - Rules assign a risk level (LOW, MEDIUM, HIGH)
 * - This config decides the system action
 * - Do NOT hard-code actions inside rules
 */

const RISK_ACTIONS = {
  LOW: {
    level: "LOW",
    description: "Minor issue with low immediate risk",
    actions: {
      notify: true,
      requireExplanation: false,
      blockOperation: false,
      escalate: false
    }
  },

  MEDIUM: {
    level: "MEDIUM",
    description: "Important issue that requires attention",
    actions: {
      notify: true,
      requireExplanation: true,
      blockOperation: false,
      escalate: false
    }
  },

  HIGH: {
    level: "HIGH",
    description: "Critical issue that poses financial or governance risk",
    actions: {
      notify: true,
      requireExplanation: true,
      blockOperation: true,
      escalate: true
    }
  }
};

/**
 * Helper function to safely get actions for a risk level
 * Defaults to LOW if unknown
 */
function getRiskAction(riskLevel) {
  return RISK_ACTIONS[riskLevel] || RISK_ACTIONS.LOW;
}

module.exports = {
  RISK_ACTIONS,
  getRiskAction
};
