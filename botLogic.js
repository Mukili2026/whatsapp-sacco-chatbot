const db = require("./database");

function processMessage(from, message) {
  message = message.trim();

  // MAIN MENU
  if (message === "hi" || message === "hello" || message === "menu") {
    return (
      "Welcome to SACCO Assist 👋\n\n" +
      "1. Check Savings Balance\n" +
      "2. Make Savings Deposit\n" +
      "3. Request Loan\n" +
      "4. Loan Balance\n" +
      "5. Help"
    );
  }

  // OPTION 1: SAVINGS BALANCE
  if (message === "1") {
    return "Your savings balance is UGX 50,000 💰";
  }

  // OPTION 2: SAVINGS DEPOSIT
  if (message === "2") {
    return (
      "Enter amount to save.\n" +
      "Example: save 10000"
    );
  }

  // HANDLE SAVINGS INPUT
  if (message.startsWith("save")) {
    const amount = message.split(" ")[1];
    return `✅ UGX ${amount} savings recorded successfully.`;
  }

  // OPTION 3: LOAN REQUEST
  if (message === "3") {
    return (
      "Enter loan amount.\n" +
      "Example: loan 200000"
    );
  }

  // HANDLE LOAN INPUT
  if (message.startsWith("loan")) {
    const amount = message.split(" ")[1];
    return `📄 Loan request of UGX ${amount} received. Await approval.`;
  }

  // OPTION 4: LOAN BALANCE
  if (message === "4") {
    return "Your loan balance is UGX 120,000 🧾";
  }

  // OPTION 5: HELP
  if (message === "5") {
    return (
      "SACCO Assist Help 📌\n" +
      "- Type *menu* to see options\n" +
      "- Use numbers to choose\n" +
      "- Contact SACCO admin if stuck"
    );
  }

  // DEFAULT
  return "❌ Invalid option. Type *menu* to continue.";
}

module.exports = { processMessage };
