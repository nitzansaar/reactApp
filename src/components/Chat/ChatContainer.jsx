import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ErrorMessage from './ErrorMessage';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../../context/ChatContext';
import SettingsButton from '../Settings/SettingsButton';
import SettingsPanel from '../Settings/SettingsPanel';
import { useSettings } from '../../context/SettingsContext';
import ContextIndicator from './ContextIndicator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.containerBg};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  position: relative;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scroll-behavior: smooth;
`;

const ClearButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #5a6268;
  }
`;

function ChatContainer() {
  const { messages, isLoading, clearHistory } = useChat();
  const { currentTheme } = useSettings();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Container theme={currentTheme}>
        <ContextIndicator />
        <ClearButton onClick={clearHistory}>Clear Chat</ClearButton>
        <SettingsButton />
        <MessagesContainer>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{
                role: 'assistant',
                content: <TypingIndicator />
              }}
            />
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <ChatInput />
      </Container>
      <ErrorMessage />
      <SettingsPanel />
    </>
  );
}

export default ChatContainer; 