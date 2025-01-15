import styled from '@emotion/styled';
import { useSettings } from '../../context/SettingsContext';

const Panel = styled.div`
  position: fixed;
  right: ${props => props.isOpen ? '0' : '-320px'};
  top: 0;
  width: 300px;
  height: 100vh;
  background: ${props => props.theme.containerBg};
  color: ${props => props.theme.text};
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  transition: right 0.3s ease;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const Range = styled.input`
  width: 100%;
  margin-bottom: 16px;
`;

const Value = styled.span`
  display: block;
  text-align: center;
  margin-bottom: 8px;
  color: #666;
`;

function SettingsPanel() {
  const { settings, updateSettings, isSettingsOpen, setIsSettingsOpen, currentTheme } = useSettings();

  return (
    <>
      <Overlay isOpen={isSettingsOpen} onClick={() => setIsSettingsOpen(false)} />
      <Panel isOpen={isSettingsOpen} theme={currentTheme}>
        <h2>Settings</h2>
        <CloseButton onClick={() => setIsSettingsOpen(false)}>&times;</CloseButton>

        <Section>
          <Label>Model</Label>
          <Select
            value={settings.model}
            onChange={(e) => updateSettings({ model: e.target.value })}
          >
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4">GPT-4 (if available)</option>
          </Select>
        </Section>

        <Section>
          <Label>Temperature (Creativity)</Label>
          <Value>{settings.temperature}</Value>
          <Range
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
          />
        </Section>

        <Section>
          <Label>Max Tokens</Label>
          <Select
            value={settings.maxTokens}
            onChange={(e) => updateSettings({ maxTokens: parseInt(e.target.value) })}
          >
            <option value="1000">1000 tokens</option>
            <option value="2000">2000 tokens</option>
            <option value="3000">3000 tokens</option>
            <option value="4000">4000 tokens</option>
          </Select>
        </Section>

        <Section>
          <Label>Theme</Label>
          <Select
            value={settings.theme}
            onChange={(e) => updateSettings({ theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </Section>

        <Section>
          <Label>Context Length</Label>
          <Select
            value={settings.contextLength}
            onChange={(e) => updateSettings({ contextLength: parseInt(e.target.value) })}
          >
            <option value="5">5 messages</option>
            <option value="10">10 messages</option>
            <option value="15">15 messages</option>
            <option value="20">20 messages</option>
          </Select>
        </Section>
      </Panel>
    </>
  );
}

export default SettingsPanel; 