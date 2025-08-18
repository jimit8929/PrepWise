import { GoogleGenerativeAI } from "@google/generative-ai"
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/Prompts.utils.js";

export const generateInterviewQuestions = async (req, res) => {
  let rawText;
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    
    // Initialize with API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    rawText = response.text();

    // Robust JSON extraction
    const jsonStart = rawText.indexOf('[');
    const jsonEnd = rawText.lastIndexOf(']');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON array found in response');
    }

    const jsonString = rawText.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonString);
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      rawText: rawText ? rawText.substring(0, 200) + '...' : 'No response',
      stack: error.stack
    });
    
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
      hint: "Check server logs for full error details"
    });
  }
};



export const generateConceptExplanantion = async (req, res) => {
  let rawText;
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Missing Required Fields",
      });
    }

    const prompt = conceptExplainPrompt(question);

    // Initialize with API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    rawText = response.text();

    // Robust JSON extraction (object instead of array here)
    const jsonStart = rawText.indexOf('{');
    const jsonEnd = rawText.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON object found in response');
    }

    const jsonString = rawText.substring(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonString);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      rawText: rawText ? rawText.substring(0, 200) + '...' : 'No response',
      stack: error.stack
    });

    res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
      hint: "Check server logs for full error details"
    });
  }
};