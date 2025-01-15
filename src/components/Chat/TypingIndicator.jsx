import styled from '@emotion/styled';

const TypingContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: #E9ECEF;
  border-radius: 18px;
  width: fit-content;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #6c757d;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;

  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
  }
`;

function TypingIndicator() {
  return (
    <TypingContainer>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </TypingContainer>
  );
}

export default TypingIndicator; 