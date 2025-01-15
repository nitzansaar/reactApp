import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TitleInput = styled.input`
  background: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  padding: 0;
  width: 100%;
  
  &:focus {
    outline: none;
    border-bottom: 1px solid ${props => props.theme.text};
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
  font-size: 12px;
  
  &:hover {
    opacity: 1;
  }
`;

function EditableTitle({ title, onSave, theme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const newTitle = editedTitle.trim();
    if (newTitle && newTitle !== title) {
      onSave(newTitle);
    } else {
      setEditedTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <TitleContainer>
      {isEditing ? (
        <TitleInput
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          theme={theme}
        />
      ) : (
        <>
          <TitleText>{title}</TitleText>
          <EditButton onClick={() => setIsEditing(true)} title="Edit title">
            ✎
          </EditButton>
        </>
      )}
    </TitleContainer>
  );
}

export default EditableTitle; 