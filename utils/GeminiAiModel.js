// _utils/GeminiAiModel.js

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINIAPIKEY;
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ EXPORT THE MODEL
export const model = genAI.getGenerativeModel({
  // Note: The latest model is "gemini-1.5-flash", not "gemini-2.5-flash-lite".
  // Using the correct model name is important.
  model: "gemini-2.5-flash-lite",
});

// You can export this config too if you need it in your component
export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

