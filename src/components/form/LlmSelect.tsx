import { LLM, llmNaming } from '@/api/types';
import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Input } from './Input';

const Wrap = styled(FormControl)`
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary)};
    border-radius: 4px;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary)};
    border-radius: 4px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary)};
    border-radius: 4px;
  }

  .MuiFormLabel-root {
    color: ${({ theme }) => theme.colors.primary};
  }

  .Mui-error {
    &.MuiFormLabel-root {
      color: ${({ theme }) => theme.colors.error} !important;
    }
  }
`;

interface LlmSelectProps {
  value?: LLM | null;
  onChange: (value: LLM) => void;
  error?: boolean;
}

export const LlmSelect: React.FC<LlmSelectProps> = ({ value, onChange, error }) => {
  return (
    <Wrap size="small" error={error} fullWidth required>
      <InputLabel>LLM</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value as LLM)} label="LLM">
        <MenuItem value={LLM.GPT4O}>{llmNaming[LLM.GPT4O]}</MenuItem>
        <MenuItem value={LLM.GEMINI15PRO}>{llmNaming[LLM.GEMINI15PRO]}</MenuItem>
        <MenuItem value={LLM.V3}>{llmNaming[LLM.V3]}</MenuItem>
        <MenuItem value={LLM.R1}>{llmNaming[LLM.R1]}</MenuItem>
      </Select>
    </Wrap>
  );
};
