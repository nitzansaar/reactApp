import { createContext, useContext, useState } from 'react';
import { useConversations } from './ConversationsContext';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    conversations, 
    activeConversationId,
    setConversations 
  } = useConversations();

  const activeConversation = conversations[activeConversationId] || {
    id: 'default',
    title: 'New Conversation',
    messages: []
  };

  const setMessages = (newMessages) => {
    setConversations(prev => ({
      ...prev,
      [activeConversationId]: {
        ...prev[activeConversationId],
        messages: typeof newMessages === 'function' 
          ? newMessages(prev[activeConversationId].messages)
          : newMessages,
        title: prev[activeConversationId]?.title || 'New Conversation'
      }
    }));
  };

  const clearHistory = () => {
    setMessages([]);
  };

  const clearError = () => setError(null);

  const value = {
    messages: activeConversation.messages,
    setMessages,
    clearHistory,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 