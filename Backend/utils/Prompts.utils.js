export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `You are an AI trained to generate technical interview questions and answers.

TASK:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Generate exactly ${numberOfQuestions} interview questions
- For each question, provide a beginner-friendly answer (2-4 lines minimum)
- Include code examples where relevant using markdown syntax
- Ensure clean formatting

OUTPUT FORMAT:
Return ONLY a valid JSON array with NO additional text, explanations, or markdown wrappers.

Expected structure:
[
  {
    "question": "Interview question text here?",
    "answer": "Detailed answer here with markdown formatting if needed."
  }
]

CRITICAL RULES:
1. Return ONLY the JSON array - no text before or after
2. NO markdown code blocks (no \`\`\`json or \`\`\`)
3. Use proper JSON escaping for quotes and special characters
4. Ensure valid JSON syntax with double quotes
5. No trailing commas

JSON:`; // ✅ Output prefix signals JSON format

export const conceptExplainPrompt = (question) => `You are an AI trained to explain technical interview concepts in depth.

TASK:
- Explain this interview question as if teaching a beginner developer
- Question: "${question}"
- Provide in-depth conceptual explanation
- Include code examples where helpful using markdown syntax
- Generate a short, clear title for the concept
- Keep formatting clean and structured

OUTPUT FORMAT:
Return ONLY a valid JSON object with NO additional text, explanations, or markdown wrappers.

Expected structure:
{
  "title": "Short descriptive title",
  "explanation": "Detailed markdown-formatted explanation with code examples if needed"
}

CRITICAL RULES:
1. Return ONLY the JSON object - no text before or after
2. NO markdown code blocks (no \`\`\`json or \`\`\`)
3. Use proper JSON escaping for quotes and special characters
4. Ensure valid JSON syntax with double quotes
5. No trailing commas
6. Markdown formatting INSIDE the explanation field is allowed and encouraged

JSON:`;
