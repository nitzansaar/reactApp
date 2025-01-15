import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chat_history';

export function useChatHistory() {
  // Initialize with welcome message
  const initialMessages = [
    { role: 'assistant', content: 'Hello! How can I assist you today?' }
  ];

  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialMessages;
  });

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  return [messages, setMessages];
} 