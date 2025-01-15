import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const sendMessage = async (message, settings) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: settings.model,
      temperature: settings.temperature,
      max_tokens: settings.maxTokens,
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};

export default openai; 