import { createContext, useState, useContext } from 'react';
import { useChatHistory } from '../hooks/useChatHistory';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useChatHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);
  const clearHistory = () => {
    setMessages([{ role: 'assistant', content: 'Hello! How can I assist you today?' }]);
    localStorage.removeItem('chat_history');
  };

  const value = {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
    clearHistory,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 