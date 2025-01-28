import { ResponseStyle, responseStyleNaming } from '@/api/types';
import { useStateSelector } from '@/state';
import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
    border: 1px solid ${({ error, theme, variantColor }) => (error ? theme.colors.error : theme.colors[variantColor])};
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

  .MuiInputBase-root,
  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface ResponseStyleSelectProps {
  value?: ResponseStyle | null;
  onChange: (value: ResponseStyle) => void;
  error?: boolean;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  onBlur?: () => void;
  required?: boolean;
}

export const ResponseStyleSelect: React.FC<ResponseStyleSelectProps> = ({
  value,
  onChange,
  error,
  color = 'primary',
  disabled,
  onBlur,
  required,
}) => {
  const colors = useStateSelector(({ theme }) => theme.colors);

  return (
    <Wrap size="small" error={error} fullWidth required={required} variantColor={color}>
      <InputLabel>Response Style (temperature)</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as ResponseStyle)}
        label="Response Style (temperature)"
        color="secondary"
        disabled={disabled}
        onBlur={onBlur}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: colors.appBgFront,
              color: 'white',
              '& .MuiMenuItem-root': {
                '&.Mui-selected': {
                  backgroundColor: colors.primary,
                  color: 'white',
                },
              },
            },
          },
        }}
      >
        <MenuItem value={ResponseStyle.SuperFocused}>{responseStyleNaming[ResponseStyle.SuperFocused]}</MenuItem>
        <MenuItem value={ResponseStyle.Precise}>{responseStyleNaming[ResponseStyle.Precise]}</MenuItem>
        <MenuItem value={ResponseStyle.Balanced}>{responseStyleNaming[ResponseStyle.Balanced]}</MenuItem>
        <MenuItem value={ResponseStyle.Creative}>{responseStyleNaming[ResponseStyle.Creative]}</MenuItem>
        <MenuItem value={ResponseStyle.HighlyCreative}>{responseStyleNaming[ResponseStyle.HighlyCreative]}</MenuItem>
      </Select>
    </Wrap>
  );
};
