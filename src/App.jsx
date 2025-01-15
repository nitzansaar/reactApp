import { useSettings } from './context/SettingsContext';
import styled from '@emotion/styled';
import ChatContainer from './components/Chat/ChatContainer';
import ConversationList from './components/Conversations/ConversationList';
import './App.css';

const AppWrapper = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
  padding: 2rem;
  padding-left: 270px;
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
`;

function App() {
  const { currentTheme } = useSettings();

  return (
    <AppWrapper theme={currentTheme}>
      <Title theme={currentTheme}>OpenAI Chatbot</Title>
      <ChatContainer />
      <ConversationList />
    </AppWrapper>
  );
}

export default App; 