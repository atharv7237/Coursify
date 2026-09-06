const { GoogleGenAI, ThinkingLevel } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Clean markdown code blocks and extract valid JSON from AI response text
 * @param {string} text
 * @returns {string}
 */
const cleanJsonText = (text) => {
    if (!text || typeof text !== 'string') return '';
    let cleaned = text.trim();

    // 1. Check for fenced code blocks ```json ... ``` or ``` ... ```
    const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
        cleaned = codeBlockMatch[1].trim();
    }

    // 2. Extract JSON object substring between outermost { and }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return cleaned.substring(firstBrace, lastBrace + 1).trim();
    }

    return cleaned;
};

/**
 * Generate structured roadmap using Google Gemini
 * @param {string} prompt
 * @returns {Promise<object>} Parsed roadmap JSON object
 */
const generateRoadmapFromAI = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.HIGH,
                },
            },
        });

        const rawText = response.text;
        const cleanedText = cleanJsonText(rawText);
        const parsedJson = JSON.parse(cleanedText);

        return parsedJson;
    } catch (error) {
        console.error('AI Generation Error:', error.message);
        throw new Error(`AI Roadmap Generation Failed: ${error.message}`);
    }
};

module.exports = {
    generateRoadmapFromAI,
    cleanJsonText,
};
