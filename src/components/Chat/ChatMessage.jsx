import styled from '@emotion/styled';
import { useSettings } from '../../context/SettingsContext';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  gap: 10px;
`;

const Bubble = styled.div`
  background: ${props => 
    props.isUser 
      ? props.theme.messageBg.user 
      : props.theme.messageBg.assistant
  };
  color: ${props => 
    props.isUser 
      ? props.theme.messageText.user 
      : props.theme.messageText.assistant
  };
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.isUser ? '#0056b3' : '#6c757d'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const { currentTheme } = useSettings();

  return (
    <MessageContainer isUser={isUser}>
      <Avatar isUser={isUser}>
        {isUser ? 'U' : 'AI'}
      </Avatar>
      <Bubble isUser={isUser} theme={currentTheme}>
        {message.content}
      </Bubble>
    </MessageContainer>
  );
}

export default ChatMessage; 