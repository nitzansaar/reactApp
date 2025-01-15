import { createContext, useContext, useState, useEffect } from 'react';
import { themes } from '../utils/themes';

const SettingsContext = createContext();

const defaultSettings = {
  model: import.meta.env.VITE_DEFAULT_MODEL || 'gpt-3.5-turbo',
  temperature: parseFloat(import.meta.env.VITE_DEFAULT_TEMPERATURE) || 0.7,
  maxTokens: parseInt(import.meta.env.VITE_DEFAULT_MAX_TOKENS) || 2000,
  theme: 'light'
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('chat_settings');
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('chat_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const currentTheme = themes[settings.theme];

  const value = {
    settings,
    updateSettings,
    isSettingsOpen,
    setIsSettingsOpen,
    currentTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 