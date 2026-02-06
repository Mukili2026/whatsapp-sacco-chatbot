// services/saccoAssistApi.js
const axios = require("axios");
const { SACCO_ASSIST_BASE_URL, API_TOKEN } = require("../config/saccoAssist.config");

async function callSaccoAssistAPI(endpoint, body = {}, method = "POST") {
  const url = `${SACCO_ASSIST_BASE_URL}${endpoint}`;

  try {
    const response = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      data: body
    });

    return response.data;
  } catch (err) {
    console.error("SACCO Assist API call failed:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { callSaccoAssistAPI };
