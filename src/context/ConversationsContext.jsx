import { createContext, useContext, useState, useEffect } from 'react';

const ConversationsContext = createContext();

const initialConversation = {
  id: 'default',
  title: 'New Conversation',
  messages: [],
  createdAt: new Date().toISOString(),
};

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useState(() => {
    const stored = localStorage.getItem('conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
      return Object.keys(parsed).length > 0 ? parsed : { default: initialConversation };
    }
    return { default: initialConversation };
  });

  const [activeConversationId, setActiveConversationId] = useState(() => {
    const stored = localStorage.getItem('activeConversationId');
    return stored || 'default';
  });

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('activeConversationId', activeConversationId);
  }, [activeConversationId]);

  const createNewConversation = () => {
    const id = `conv-${Date.now()}`;
    setConversations(prev => ({
      ...prev,
      [id]: {
        id,
        title: 'New Conversation',
        messages: [],
        createdAt: new Date().toISOString(),
      }
    }));
    setActiveConversationId(id);
  };

  const deleteConversation = (id) => {
    if (Object.keys(conversations).length <= 1) {
      // If this is the last conversation, create a new empty one
      setConversations({ default: initialConversation });
      setActiveConversationId('default');
      return;
    }

    setConversations(prev => {
      const { [id]: deleted, ...rest } = prev;
      return rest;
    });

    if (activeConversationId === id) {
      const remainingIds = Object.keys(conversations).filter(convId => convId !== id);
      setActiveConversationId(remainingIds[0]);
    }
  };

  const updateConversationTitle = (id, title) => {
    setConversations(prev => ({
      ...prev,
      [id]: { ...prev[id], title }
    }));
  };

  const setConversationMessages = (id, messages) => {
    setConversations(prev => ({
      ...prev,
      [id]: { 
        ...(prev[id] || initialConversation),
        messages 
      }
    }));
  };

  const value = {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    deleteConversation,
    updateConversationTitle,
    setConversationMessages
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const context = useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error('useConversations must be used within a ConversationsProvider');
  }
  return context;
} 