// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 4000;
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

app.use(bodyParser.json());
app.use(express.static("borisgame")); // Serve static files from the 'public' directory

// Endpoint to receive score from the HTML file
app.post("/sendScore", (req, res) => {
  const { score, chatId } = req.body;
  if (score && chatId) {
    // Forward the score to the Telegram bot
    axios
      .post(telegramApiUrl, {
        chat_id: chatId,
        text: `Your game score is: ${score}`,
      })
      .then((response) => {
        res.json({ message: "Score sent to Telegram bot", score });
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to send score to Telegram bot" });
      });
  } else {
    res.status(400).json({ error: "Score and chatId are required" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
