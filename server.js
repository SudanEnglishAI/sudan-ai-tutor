require("dotenv").config();
console.log("API Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  console.log("Request received:", req.body);
  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question,
    });

    res.json({
      candidates: [
        {
          content: {
            parts: [
              {
                text: response.text,
              },
            ],
          },
        },
      ],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Sudan AI Tutor is running on port ${PORT}`);
});