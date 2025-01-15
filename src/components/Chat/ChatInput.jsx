import { useState } from 'react';
import styled from '@emotion/styled';
import { useChat } from '../../context/ChatContext';
import { useSettings } from '../../context/SettingsContext';
import { sendMessage } from '../../services/openai';

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid ${props => props.theme.inputBorder};
  border-radius: 6px;
  font-size: 16px;
  background: ${props => props.theme.inputBg};
  color: ${props => props.theme.text};
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:disabled {
    background: #ccc;
  }
`;

function ChatInput() {
  const [input, setInput] = useState('');
  const { messages, setMessages, isLoading, setIsLoading, setError } = useChat();
  const { settings, currentTheme } = useSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input, settings, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InputContainer theme={currentTheme}>
      <Form onSubmit={handleSubmit}>
        <Input
          theme={currentTheme}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Form>
    </InputContainer>
  );
}

export default ChatInput; 