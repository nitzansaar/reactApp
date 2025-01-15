import styled from '@emotion/styled';
import { useChat } from '../../context/ChatContext';

const ErrorContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ff4444;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  animation: slideIn 0.3s ease-out;
  cursor: pointer;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

function ErrorMessage() {
  const { error, clearError } = useChat();

  if (!error) return null;

  return (
    <ErrorContainer onClick={clearError}>
      {error}
    </ErrorContainer>
  );
}

export default ErrorMessage; 