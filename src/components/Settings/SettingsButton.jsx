import styled from '@emotion/styled';
import { useSettings } from '../../context/SettingsContext';

const Button = styled.button`
  position: absolute;
  top: -40px;
  right: 100px;
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #5a6268;
  }
`;

const Icon = styled.span`
  font-size: 18px;
`;

function SettingsButton() {
  const { setIsSettingsOpen } = useSettings();

  return (
    <Button onClick={() => setIsSettingsOpen(true)}>
      <Icon>⚙️</Icon>
      Settings
    </Button>
  );
}

export default SettingsButton; 