import { LLM, llmNaming } from '@/api/types';
import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Input } from './Input';

const Wrap = styled(FormControl)<{ variantColor: 'primary' | 'secondary' }>`
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme, variantColor }) => (error ? theme.colors.error : theme.colors[variantColor])};
    border-radius: 8px;
    opacity: 0.7;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme, variantColor }) => (error ? theme.colors.error : theme.colors[variantColor])};
    border-radius: 8px;
    opacity: 1;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${({ error, theme, variantColor }) => (error ? theme.colors.error : theme.colors[variantColor])};
    border-radius: 8px;
    opacity: 1;
  }

  .MuiFormLabel-root {
    color: ${({ theme, variantColor }) => theme.colors[variantColor]};
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
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  onBlur?: () => void;
}

export const LlmSelect: React.FC<LlmSelectProps> = ({
  value,
  onChange,
  error,
  color = 'primary',
  disabled,
  onBlur,
}) => {
  return (
    <Wrap size="small" error={error} fullWidth required variantColor={color}>
      <InputLabel>LLM</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as LLM)}
        label="LLM"
        color="secondary"
        disabled={disabled}
        onBlur={onBlur}
      >
        <MenuItem value={LLM.GPT4O}>{llmNaming[LLM.GPT4O]}</MenuItem>
        <MenuItem value={LLM.GEMINI15PRO}>{llmNaming[LLM.GEMINI15PRO]}</MenuItem>
        <MenuItem value={LLM.V3}>{llmNaming[LLM.V3]}</MenuItem>
        <MenuItem value={LLM.R1}>{llmNaming[LLM.R1]}</MenuItem>
      </Select>
    </Wrap>
  );
};
