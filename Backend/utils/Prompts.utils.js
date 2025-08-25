export const questionAnswerPrompt = (role , experience , topicsToFocus , numberOfQuestions) => (
  `You are an AI trained to generate techinical interview questions and answers.
  
  Task:
  -Role: ${role}
  -Candidate Experience: ${experience} years
  -Focus Topics: ${topicsToFocus}
  -Write ${numberOfQuestions} interview questions.
  -For each question, generate a beginner-friendly answer of minimum 2-4 lines.
  -If the answer needs a code example, add a small code block inside.
  -Keep formatting very Clean.
  -Return a pure JSON array like:
  [
    {
      "question" : "Question here?",
      "answer" : "Answer here."
    },
    ...
  ]
  
  Important: DO not add any extra text. only return valid json.
  `)


export const conceptExplainPrompt = (question) => (
`
You are an AI trained to generate explanations for a given interview question.

Task:
-Explain the following interview question and it's concept in depth as if you're teaching a beginner developer.
-Question: "${question}"
-After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
-If the explanation includes a code example, provide a small code block.
-Keep the formatting very clean and clear
-Return the result as a valid json object in the following format:

{
"title" : "Short title here?",
"explanation" : "Explanation here."
}

Important: Do not add any extra text outside the JSON format. only return valid JSON
`)


