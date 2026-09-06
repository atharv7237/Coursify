/**
 * Generates structured prompt for Google Gemini AI roadmap creation
 * @param {string} goal
 * @param {string} level
 * @param {number|string} hours
 * @param {number|string} months
 * @returns {string}
 */
const generatePrompt = (goal, level, hours, months) => {
    return `
You are an expert career mentor and technical roadmap planner.

Generate a personalized learning roadmap using the following parameters:

Goal: ${goal}
Current Skill Level: ${level}
Daily Study Hours: ${hours} hours/day
Target Duration: ${months} months

Requirements:
1. Create a month-wise and milestone-wise structured roadmap.
2. Divide each period into concrete learning milestones.
3. Mention critical topics that should be mastered.
4. Recommend free, high-quality resources (like YouTube courses, official docs) where appropriate.
5. Suggest realistic mini-projects for practical learning along the journey.
6. Suggest one comprehensive capstone project at the end.
7. Ensure workload is realistic for ${hours} study hours per day over ${months} months.
8. Only recommend free resources (no paid courses/paywalls).
9. Explain why each topic/milestone is important.

Output Format:
You MUST provide your response strictly in valid JSON format.
Do NOT wrap the output in markdown code blocks (\`\`\`json or \`\`\`).
Do NOT include any commentary before or after the JSON.

Expected JSON Structure:
{
  "roadmapTitle": "Title of Roadmap",
  "overview": "Comprehensive overview of the learning journey",
  "duration": "${months} Months",
  "studyHoursPerDay": "${hours} Hours/Day",
  "milestones": [
    {
      "title": "Milestone Title",
      "duration": "e.g. Month 1 / Weeks 1-4",
      "description": "Milestone description and objectives",
      "topics": [
        "Topic 1",
        "Topic 2"
      ],
      "whyImportant": [
        "Reason 1",
        "Reason 2"
      ],
      "resources": [
        {
          "title": "Resource Name",
          "type": "Video / Documentation",
          "platform": "YouTube / Official Docs"
        }
      ],
      "project": {
        "title": "Mini Project Title",
        "description": "Mini project description"
      }
    }
  ],
  "finalProject": {
    "title": "Capstone Project Title",
    "description": "Capstone project detailed description"
  },
  "expectedOutcome": "Outcome description upon completing the roadmap",
  "skillsGained": [
    "Skill 1",
    "Skill 2"
  ]
}
`;
};

module.exports = { generatePrompt };
