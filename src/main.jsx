import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SettingsProvider } from './context/SettingsContext'
import { ChatProvider } from './context/ChatContext'
import { ConversationsProvider } from './context/ConversationsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <ConversationsProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ConversationsProvider>
    </SettingsProvider>
  </React.StrictMode>,
) 