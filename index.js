const db = require("./database");
const express = require("express");

const app = express();
app.use(express.json());

// --------------------
// SIMPLE STATE STORAGE
// --------------------
const userStates = {};

// --------------------
// MENU FUNCTIONS
// --------------------
function mainMenu() {
  return `👋 Welcome to SACCO Assist

1️⃣ Join SACCO
2️⃣ Check Savings
3️⃣ Loan Services
4️⃣ Contributions
5️⃣ Statements
6️⃣ Help

Reply with a number`;
}

function handleMainMenu(from, message) {
  switch (message) {
    case "1":
      userStates[from] = "JOIN_SACCO";
      return "📝 Please send: FULL NAME, MEMBER ID (or N/A)";
    case "2":
      userStates[from] = "CHECK_SAVINGS";
      return "💰 Checking your savings balance...";
    default:
      return "❌ Invalid option. Reply 1–6.";
  }
}

// --------------------
// MESSAGE PROCESSOR
// --------------------
function processMessage(from, message) {
  message = message.trim();

  if (["hi", "hello", "start", "menu"].includes(message.toLowerCase())) {
    userStates[from] = "MAIN_MENU";
    return mainMenu();
  }

  const state = userStates[from] || "MAIN_MENU";

  // JOIN SACCO
  if (state === "JOIN_SACCO") {
    const parts = message.split(",");
    if (parts.length < 2) {
      return "❌ Please send: FULL NAME, MEMBER ID (or N/A)";
    }

    const name = parts[0].trim();
    const memberId = parts[1].trim();

    db.run(
      `INSERT OR IGNORE INTO members (phone, name, member_id)
       VALUES (?, ?, ?)`,
      [from, name, memberId]
    );

    userStates[from] = "MAIN_MENU";
    return "✅ Registration successful!\nReply MENU.";
  }

  // CHECK SAVINGS
  if (state === "CHECK_SAVINGS") {
    db.get(
      `SELECT savings FROM members WHERE phone = ?`,
      [from],
      (err, row) => {
        if (err || !row) {
          return "❌ Member not found. Please register first.";
        }
      }
    );

    userStates[from] = "MAIN_MENU";
    return "💰 Your savings balance is UGX 0\nReply MENU.";
  }

  // MAIN MENU
  return handleMainMenu(from, message);
}

// --------------------
// WEBHOOK ENDPOINT
// --------------------
app.post("/webhook", (req, res) => {
  const { from, message } = req.body;

  let reply = "";

  if (!message) {
    reply = "Welcome to SACCO Assist 👋\nReply with:\n1️⃣ Join SACCO\n2️⃣ Check Balance\n3️⃣ Save Money\n4️⃣ Help";
  } 
  else if (message === "1") {
    reply = "✅ Registration coming soon.\nPlease send your name.";
  } 
  else if (message === "2") {
    reply = "💰 Your balance is UGX 0 (demo)";
  } 
  else if (message === "3") {
    reply = "💵 How much do you want to save?";
  } 
  else if (message === "4") {
    reply = "📞 SACCO Assist Help:\nReply 1–4 to continue.";
  } 
  else {
    reply = "❌ Invalid option.\nReply with:\n1️⃣ Join\n2️⃣ Balance\n3️⃣ Save\n4️⃣ Help";
  }

  console.log("Reply:", reply);
  res.json({ reply });
});

// --------------------
// HEALTH CHECK
// --------------------
app.get("/", (req, res) => {
  res.send("SACCO Assist webhook is running ✅");
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
function registerMember(phone, name, callback) {
  const memberId = "SACCO-" + Math.floor(100000 + Math.random() * 900000);

  const sql = `
    INSERT INTO members (phone, name, member_id)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [phone, name, memberId], function (err) {
    if (err) {
      callback("❌ You are already registered.");
    } else {
      callback(`✅ Welcome ${name}!\nYour Member ID: ${memberId}`);
    }
  });
}

