
import "dotenv/config";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getGeminiResponse = async(message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message,
    });

    return response.text;

  } catch (err) {
    console.error("Gemini Error:",err);
    throw err;
  }
};

export default getGeminiResponse;