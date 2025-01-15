import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Maximum number of messages to keep in context
const MAX_CONTEXT_MESSAGES = 10;

export const sendMessage = async (message, settings, messageHistory = []) => {
  try {
    // Get the last N messages for context
    const contextMessages = messageHistory
      .slice(-MAX_CONTEXT_MESSAGES)
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));

    // Add the current message
    contextMessages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      messages: contextMessages,
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