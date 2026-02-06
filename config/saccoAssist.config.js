// config/saccoAssist.config.js
module.exports = {
  // Base URL for SACCO Assist API
  SACCO_ASSIST_BASE_URL: process.env.SACCO_ASSIST_BASE_URL || "https://api.sacco-assist.com/v1",
  
  // API token to authenticate WhatsApp bot
  API_TOKEN: process.env.SACCO_ASSIST_API_TOKEN || "your-api-token-here"
};
