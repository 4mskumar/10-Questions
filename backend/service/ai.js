import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const runGeminiPrompt = async (history) => {
  try {
    // Format the conversation history
    const formattedHistory = history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedHistory,
    });

    const aiText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return aiText || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error in runGeminiPrompt:", error.message);
    return "Sorry, I couldn't generate a response.";
  }
};

export default runGeminiPrompt;
