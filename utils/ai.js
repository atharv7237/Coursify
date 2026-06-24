const { GoogleGenAI, ThinkingLevel } = require('@google/genai');
const ai = new GoogleGenAI({
  apikey:process.env.GEMINI_API_KEY
});

module.exports.generate = async(prompt)=> {
  try{
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents:prompt,
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      }
    },
  });
  return response.text;
}
catch(error)
{
  
    return error.message
}
}




