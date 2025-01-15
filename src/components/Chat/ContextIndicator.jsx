import styled from '@emotion/styled';
import { useChat } from '../../context/ChatContext';

const Container = styled.div`
  position: absolute;
  top: -40px;
  left: 0;
  font-size: 14px;
  color: ${props => props.theme.secondaryText};
`;

const MAX_CONTEXT_MESSAGES = 10;

function ContextIndicator() {
  const { messages } = useChat();
  const contextSize = Math.min(messages.length, MAX_CONTEXT_MESSAGES);

  if (messages.length <= MAX_CONTEXT_MESSAGES) return null;

  return (
    <Container>
      Using last {contextSize} messages for context
    </Container>
  );
}

export default ContextIndicator; 