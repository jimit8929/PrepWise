import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

console.log("✅ Loaded key:", process.env.GEMINI_API_KEY ? "Yes" : "No");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    // Use current stable model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hello Gemini!");
    console.log("✅ Response:", result.response.text());
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

testGemini();
