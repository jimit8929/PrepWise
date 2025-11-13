// import { GoogleGenerativeAI } from "@google/generative-ai";
// import {
//   conceptExplainPrompt,
//   questionAnswerPrompt,
// } from "../utils/Prompts.utils.js";

// export const generateInterviewQuestions = async (req, res) => {
//   let rawText;
//   try {
//     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//       return res.status(400).json({ message: "Missing Required Fields" });
//     }

//     const prompt = questionAnswerPrompt(
//       role,
//       experience,
//       topicsToFocus,
//       numberOfQuestions
//     );

//     // Initialize with API key
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     rawText = response.text();

//     // Robust JSON extraction
//     const jsonStart = rawText.indexOf("[");
//     const jsonEnd = rawText.lastIndexOf("]");

//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("No valid JSON array found in response");
//     }

//     const jsonString = rawText.substring(jsonStart, jsonEnd + 1);
//     const data = JSON.parse(jsonString);

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error details:", {
//       message: error.message,
//       rawText: rawText ? rawText.substring(0, 200) + "..." : "No response",
//       stack: error.stack,
//     });

//     res.status(500).json({
//       message: "Failed to generate questions",
//       error: error.message,
//       hint: "Check server logs for full error details",
//     });
//   }
// };

// export const generateConceptExplanantion = async (req, res) => {
//   let rawText;
//   try {
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({
//         message: "Missing Required Fields",
//       });
//     }

//     const prompt = conceptExplainPrompt(question);

//     // Initialize with API key
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     rawText = response.text();

//     // Robust JSON extraction (object instead of array here)
//     const jsonStart = rawText.indexOf("{");
//     const jsonEnd = rawText.lastIndexOf("}");

//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("No valid JSON object found in response");
//     }

//     const jsonString = rawText.substring(jsonStart, jsonEnd + 1);
//     const data = JSON.parse(jsonString);

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error details:", {
//       message: error.message,
//       rawText: rawText ? rawText.substring(0, 200) + "..." : "No response",
//       stack: error.stack,
//     });

//     res.status(500).json({
//       message: "Failed to generate concept explanation",
//       error: error.message,
//       hint: "Check server logs for full error details",
//     });
//   }
// };


import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/Prompts.utils.js";

console.log("🔑 Checking API Key...");
console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
console.log("API Key first 10 chars:", process.env.GEMINI_API_KEY?.substring(0, 10));

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set!");
}

// Helper: JSON extraction (unchanged - perfect as is)
function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const cleaned = text
      .replace(/```[^\n]*\n?/g, "")   // remove opening ``` and optional language+newline
      .replace(/```\n?/g, "")        // remove any closing ```
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (e2) {
      const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error("No valid JSON found in response");
    }
  }
}

// Helper: Error parsing (NEW - optional but recommended)
function parseGeminiError(error) {
  return {
    isRateLimit: error.message.includes("429") || error.message.includes("quota"),
    isOverloaded: error.message.includes("503") || error.message.includes("overloaded"),
    isAuthError: error.message.includes("API key") || error.message.includes("401"),
    message: error.message,
  };
}

// Helper: Retry logic (unchanged - perfect as is)
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      const isRetryable =
        error.message.includes("503") ||
        error.message.includes("429") ||
        error.message.includes("500");

      if (isRetryable && i < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, i), 10000);
        console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const generateContent = async () => {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // ✅ Use stable model
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4,
          topP: 0.8,
          topK: 40,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    };

    // Retry with backoff
    const rawText = await retryWithBackoff(generateContent);

    console.log("Raw Gemini Response:", rawText.substring(0, 200));

    // Robust JSON extraction
    const data = extractJSON(rawText);

    // Validate response structure
    if (!Array.isArray(data)) {
      throw new Error("Response is not an array");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Generate Questions Error:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });

    // Specific error responses
    if (error.message.includes("429")) {
      return res.status(429).json({
        message: "Rate limit exceeded. Please wait a minute.",
        retryAfter: 60,
      });
    }

    if (error.message.includes("503")) {
      return res.status(503).json({
        message: "Service temporarily unavailable. Please try again.",
      });
    }

    if (error.message.includes("API key")) {
      return res.status(401).json({
        message: "Invalid API key configuration",
      });
    }

    res.status(500).json({
      message: "Failed to generate questions",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};

// export const generateConceptExplanantion = async (req, res) => {
//   try {
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({
//         message: "Missing Required Fields",
//       });
//     }

//     console.log("Generating explanation for:", question);

//     const prompt = conceptExplainPrompt(question);

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//     const generateContent = async () => {
//       const model = genAI.getGenerativeModel({
//         model: "gemini-2.0-flash", // ✅ Use stable model
//         generationConfig: {
//           responseMimeType: "application/json",
//           temperature: 0.4,
//           topP: 0.8,
//           topK: 40,
//         },
//       });

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       return response.text();
//     };

//     // Retry with backoff
//     const rawText = await retryWithBackoff(generateContent);

//     console.log("Raw Gemini Response:", rawText.substring(0, 200));

//     // Robust JSON extraction
//     const data = extractJSON(rawText);

//     // Validate response structure
//     if (!data.title || !data.explanation) {
//       console.warn("⚠️ Unexpected response structure:", data);
//     }

//     res.status(200).json(data);
//   } catch (error) {
//     console.error("❌ Generate Explanation Error:", {
//       message: error.message,
//       stack: error.stack,
//       body: req.body,
//     });

//     if (error.message.includes("429")) {
//       return res.status(429).json({
//         message: "Rate limit exceeded. Please wait a minute.",
//         retryAfter: 60,
//       });
//     }

//     if (error.message.includes("503")) {
//       return res.status(503).json({
//         message: "Service temporarily unavailable. Please try again.",
//       });
//     }

//     res.status(500).json({
//       message: "Failed to generate concept explanation",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };
export const generateConceptExplanantion = async (req, res) => {
  console.log("🔵 Step 1: Function called");
  
  try {
    const { question } = req.body;
    console.log("🔵 Step 2: Question received:", question);

    if (!question) {
      console.log("❌ Step 2.5: No question provided");
      return res.status(400).json({
        message: "Missing Required Fields",
      });
    }

    console.log("🔵 Step 3: Creating prompt...");
    const prompt = conceptExplainPrompt(question);
    console.log("🔵 Step 4: Prompt created, length:", prompt.length);

    console.log("🔵 Step 5: Initializing Gemini with key:", process.env.GEMINI_API_KEY?.substring(0, 10));
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("🔵 Step 6: Gemini initialized");

    const generateContent = async () => {
      console.log("🔵 Step 7: Getting model...");
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4,
          topP: 0.8,
          topK: 40,
        },
      });
      console.log("🔵 Step 8: Model obtained, generating content...");

      const result = await model.generateContent(prompt);
      console.log("🔵 Step 9: Content generated");
      
      const response = await result.response;
      console.log("🔵 Step 10: Response extracted");
      
      const text = response.text();
      console.log("🔵 Step 11: Text extracted, length:", text?.length);
      
      return text;
    };

    console.log("🔵 Step 12: Starting retry logic...");
    const rawText = await retryWithBackoff(generateContent);
    console.log("🔵 Step 13: Retry completed, raw text:", rawText.substring(0, 100));

    const data = extractJSON(rawText);
    console.log("🔵 Step 14: JSON extracted successfully");

    if (!data.title || !data.explanation) {
      console.warn("⚠️ Unexpected response structure:", data);
    }

    console.log("🔵 Step 15: Sending response...");
    res.status(200).json(data);
    console.log("✅ Success!");
    
  } catch (error) {
    console.error("❌ ERROR AT SOME STEP:", {
      message: error.message,
      stack: error.stack.substring(0, 500),
    });

    res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};
