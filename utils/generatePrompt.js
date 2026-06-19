module.exports.generatePrompt = (goal, level, hours, months, Domain) => {
return `
You are an expert career mentor and roadmap planner.

Generate a personalized learning roadmap using the following information:

Domain: ${Domain}
Goal: ${goal}
Current Level: ${level}
Study Hours Per Day: ${hours}
Duration: ${months} months

Requirements:

1. Create a month-wise roadmap.
2. Divide each month into learning milestones.
3. Mention important topics that should be learned.
4. Recommend free YouTube courses whenever appropriate.
5. Suggest mini-projects during the learning journey.
6. Suggest one major capstone project at the end.
7. Keep the roadmap realistic for the provided study hours.
8. Do not recommend paid resources.
9. Explain why each topic is important.
10. Return the response in proper Markdown format.

Output Format:

# Roadmap Overview

## Month 1

Topics:

* ...

Why Learn:

* ...

Resources:

* ...

Mini Project:

* ...

## Month 2

...

## Final Project

...

## Expected Outcome

...
`;
}
