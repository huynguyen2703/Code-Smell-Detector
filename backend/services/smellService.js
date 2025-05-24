const axios = require("axios");
const DL_API = process.env.DL_API;

const axiosInstance = axios.create({
  timeout: 5000,
});

async function detectSmells(code, language) {
  try {
    // function receives snippet and send to endpoint below for analyzing
    const response = await axiosInstance.post(
      DL_API,
      { code,
        language },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
    // return {"long method": "This method is too long", "dead code": "Code is triggered"};
  } catch (err) {
    console.error("Error calling DL API:", err.message);
    if (err == "ECONNABORTED") {
      console.error("Request time out");
    }
    throw err;
  }
}

exports.detectSmells = detectSmells;
