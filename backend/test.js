import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
    try {
        console.log("Testing Gemini 3.5 Flash...");

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "who is virat kohli?",
        });

        console.log("Gemini Response:");
        console.log(response.text);

    } catch (error) {
        console.log("Gemini API Test Failed:");
        console.log(error);
    }
}

test();