import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function listModels() {
    try {

        console.log("Available Gemini models:\n");

        const response = await ai.models.list();

        for await (const model of response) {

            console.log(
                model.name,
                "|",
                model.displayName
            );
        }

    } catch (error) {

        console.error("Failed to list models:");
        console.error(error);

    }
}

listModels();