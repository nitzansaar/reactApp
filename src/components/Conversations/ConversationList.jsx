import styled from '@emotion/styled';
import { useConversations } from '../../context/ConversationsContext';
import { useSettings } from '../../context/SettingsContext';
import EditableTitle from './EditableTitle';

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background: ${props => props.theme.containerBg};
  border-right: 1px solid ${props => props.theme.border};
  padding: 20px;
  overflow-y: auto;
`;

const NewButton = styled.button`
  width: 100%;
  padding: 10px;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ConversationItem = styled.div`
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  cursor: pointer;
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background: ${props => props.active ? props.theme.primary : props.theme.border};
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

function ConversationList() {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    createNewConversation,
    deleteConversation,
    updateConversationTitle
  } = useConversations();
  const { currentTheme } = useSettings();

  const handleTitleUpdate = (id, newTitle) => {
    updateConversationTitle(id, newTitle);
  };

  return (
    <Container theme={currentTheme}>
      <NewButton theme={currentTheme} onClick={createNewConversation}>
        New Conversation
      </NewButton>
      {Object.values(conversations)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(conv => (
          <ConversationItem
            key={conv.id}
            active={conv.id === activeConversationId}
            theme={currentTheme}
            onClick={() => setActiveConversationId(conv.id)}
          >
            <EditableTitle
              title={conv.title}
              onSave={(newTitle) => handleTitleUpdate(conv.id, newTitle)}
              theme={currentTheme}
            />
            <ButtonsContainer>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
              >
                ×
              </DeleteButton>
            </ButtonsContainer>
          </ConversationItem>
        ))}
    </Container>
  );
}

export default ConversationList; 