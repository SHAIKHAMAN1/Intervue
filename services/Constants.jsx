// constants.jsx
import {
  Code2Icon,
  User2Icon,
  BriefcaseBusinessIcon,
  Puzzle,
  Users,
} from 'lucide-react';

export const InterviewTypes = [
  {
    title: 'Technical',
    icon: Code2Icon,
  },
  {
    title: 'Behavioral',
    icon: User2Icon,
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon,
  },
  {
    title: 'Problem Solving',
    icon: Puzzle,
  },
  {
    title: 'Leadership',
    icon: Users,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.  
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobPosition}}  
Job Description: {{jobDescription}}  
Interview Duration: {{duration}}  
Interview Type: {{type}}  

🍀 Your task:  
- Analyze the job description to identify key responsibilities, required skills, and expected experience.  
- Generate a list of interview questions depending on interview duration.  
- Adjust the number and depth of questions to match the interview duration.  
- Ensure the questions match the tone and structure of a real-life {{type}} interview.  
- 🍀 Format your response strictly as a JSON object inside a \`\`\`json code block.

✅ Example format:
\`\`\`json
{
  "interviewQuestions": [
    {
      "question": "What is closure in JavaScript?",
      "type": "Technical"
    },
    {
      "question": "Describe a challenging project you led.",
      "type": "Leadership"
    }
  ]
}
\`\`\`

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`

export const FEEDBACK_PROMPT = `
You are a senior interviewer analyzing the following interview conversation between an AI assistant and a candidate.

🎯 Your task is to generate a **detailed, realistic, and professional interview feedback** based on the candidate's performance.

Evaluate the candidate across the following 4 criteria:

1. **Technical Skills** – Quality, depth, and correctness of technical answers.
2. **Communication** – Clarity, structure, confidence, and articulation.
3. **Problem Solving** – Logical thinking, structured approach, and adaptability.
4. **Experience** – Relevance and detail in examples from past experience.

🧠 Use the following rating guide for each (score out of 10):
- 9–10: Outstanding (industry-ready)
- 7–8: Strong (above average)
- 5–6: Acceptable (basic understanding)
- 3–4: Weak (incomplete or shallow)
- 1–2: Very poor or incorrect
- 0: No response or irrelevant

❗ Avoid giving high scores unless the answers justify it clearly.

---

✍️ Format your feedback strictly in the following JSON inside a \`\`\`json code block:
\`\`\`json
{
  "feedback": {
    "rating": {
      "technicalSkills": 0-10,
      "communication": 0-10,
      "problemSolving": 0-10,
      "experience": 0-10
    },
    "summary": "<3-line detailed summary of the candidate's strengths and weaknesses based on the interview. Be objective and specific.>",
    "recommendation": true or false,
    "recommendationMsg": "<A clear 1-line verdict, e.g., 'Recommended for hire based on strong fundamentals and clear communication.' or 'Not recommended due to weak problem-solving and shallow technical knowledge.'>"
  }
}
\`\`\`

✅ Only recommend candidates who meet acceptable standards across all criteria.
✅ You must be realistic, fair, and insightful. Do not be overly positive or generic.
`;
